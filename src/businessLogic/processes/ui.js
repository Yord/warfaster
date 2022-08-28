import { eventChannel } from "redux-saga";
import { all, put, select, take } from "redux-saga/effects";
import {
  CardDragEnded,
  CardDragStarted,
  FetchWikiPage,
  MenuItemClicked,
} from "../../messages";
import { CypherCodecs } from "../../state/CypherCodecs";
import { Dragging } from "../../state/Dragging";
import { FactionModels } from "../../state/FactionModels";
import { Lists } from "../../state/Lists";
import { PageIds } from "../../state/PageIds";
import { Url } from "../../state/Url";
import { WildCardModels } from "../../state/WildCardModels";
import { toBase62, fromBase62 } from "./base62";

function* ui() {
  yield all([
    addCard(),
    removeCards(),
    setDraggingFalse(),
    setDraggingTrue(),
    updateCards(),
    updateUrl(),
    parseListsFromQuery(),
    fetchCardOnShow(),
  ]);
}

export { ui };

function* updateCards() {
  while (true) {
    const { payload } = yield take(CardDragEnded().type);
    const { reason, source, destination } = payload;
    if (reason === "DROP" && destination.droppableId.startsWith("cards_")) {
      const sourceListIndex = parseInt(
        source.droppableId.replace("cards_", ""),
        10
      );
      const sourcePosition = source.index;

      const destinationListIndex = parseInt(
        destination.droppableId.replace("cards_", ""),
        10
      );
      const destinationPosition = destination.index;

      yield put(
        Lists.moveCard({
          source: { listIndex: sourceListIndex, cardIndex: sourcePosition },
          destination: {
            listIndex: destinationListIndex,
            cardIndex: destinationPosition,
          },
        })
      );
    }
  }
}

function* removeCards() {
  while (true) {
    const { payload } = yield take(CardDragEnded().type);
    const { reason, source, destination } = payload;
    if (reason === "DROP" && destination.droppableId.startsWith("trash")) {
      const listIndex = parseInt(source.droppableId.replace("cards_", ""), 10);
      const cardIndex = source.index;

      yield put(
        Lists.removeCard({
          source: { listIndex, cardIndex },
        })
      );
    }
  }
}

function* addCard() {
  while (true) {
    const { payload } = yield take(MenuItemClicked().type);
    const { page } = payload;
    const model = yield select(FactionModels.selectByPage(page));
    const wildCard = yield select(WildCardModels.selectByPage(page));
    const cypher = yield select(CypherCodecs.selectByPage(page));
    if (model || wildCard || cypher) {
      const pageId = yield select(PageIds.selectByPage(page));
      yield put(Lists.addCard({ pageId }));
    }
  }
}

function* setDraggingTrue() {
  while (yield take(CardDragStarted().type)) {
    yield put(Dragging.activate());
  }
}

function* setDraggingFalse() {
  while (yield take(CardDragEnded().type)) {
    yield put(Dragging.deactivate());
  }
}

function* updateUrl() {
  while (yield take((action) => action.type.startsWith("Lists."))) {
    const lists = yield select(Lists.select());
    const pageIds = lists.map(({ cards }) => cards.map((_) => _.pageId));

    if (window.history && window.history.replaceState) {
      const maxPageId = Math.max(0, ...pageIds.flat());
      const codeLength = Math.ceil(Math.log(maxPageId + 1) / Math.log(62)) || 0;

      const state = lists.reduce(
        (state, list, index) => ({
          ...state,
          [`t${index}`]: list.title,
          [`l${index}`]: list.cards.reduce(
            (acc, card) =>
              acc +
              toBase62(card.pageId).padStart(codeLength, "0") +
              (card.cortexIds || card.weaponIds
                ? `(${(card.cortexIds || [])
                    .map((id) => toBase62(id).padStart(codeLength, "0"))
                    .join("")},${(card.weaponIds || [])
                    .map((id) => toBase62(id).padStart(codeLength, "0"))
                    .join("")})`
                : ""),
            ""
          ),
        }),
        { v: 1, e: codeLength }
      );

      const query = Object.entries(state)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
      const url =
        window.location.origin + window.location.pathname + "?" + query;

      yield put(Url.set({ url }));

      window.history.replaceState(query, "", url);
    }
  }
}

function* parseListsFromQuery() {
  const loadChannel = eventChannel((emitter) => {
    window.addEventListener("load", emitter);

    return () => {
      window.removeEventListener("load", emitter);
    };
  });

  while (true) {
    const event = yield take(loadChannel);

    const urlParams = new URLSearchParams(event.target.location.search);
    const params = Object.fromEntries(urlParams);

    const version = params.v;
    const exponent = parseInt(params.e, 10) || 0;

    if (version === "1" && exponent) {
      const titleIndexes = Object.keys(params)
        .filter((key) => key.match(/^t[\d]+$/))
        .map((key) => parseInt(key.substring(1), 10))
        .sort((a, b) => a - b);

      const lists = titleIndexes.map((index) => ({
        title: params["t" + index],
        cards: parseList(exponent, params["l" + index]),
      }));

      yield put(Lists.set({ lists }));
    } else {
      yield put(Lists.set({ lists: [] }));
    }
  }
}

function* fetchCardOnShow() {
  while (true) {
    const { payload } = yield take("Lists.toggleCard");
    if (payload && payload.pageId) {
      const page = yield select(PageIds.selectPageByPageId(payload.pageId));
      if (page) {
        yield put(FetchWikiPage({ page }));
      }
    }
  }
}

function parseList(exponent, encodedList) {
  function parseCards(cards, rest) {
    if (rest === "") {
      return cards;
    }

    const pageId = rest.slice(0, exponent);

    if (rest[exponent] === "(") {
      const blockEnd = rest.indexOf(")");
      const delimiter = rest.indexOf(",");
      if (!blockEnd || !delimiter) {
        return [];
      }

      const block = rest.slice(exponent + 1, blockEnd);
      const [cortexIds, weaponIds] = block.split(",");
      return parseCards(
        [
          ...cards,
          {
            pageId,
            cortexIds: partitionBy(exponent, cortexIds),
            weaponIds: partitionBy(exponent, weaponIds),
          },
        ],
        rest.slice(blockEnd + 1)
      );
    }

    return parseCards(
      [...cards, { pageId, cortexIds: [], weaponIds: [] }],
      rest.slice(exponent)
    );
  }

  const cards = parseCards([], encodedList);

  const decode = (string) =>
    parseInt(fromBase62(string.replace(/^0+/, "") || "0"), 10);

  return cards
    .map(({ pageId, cortexIds, weaponIds }) => ({
      pageId: decode(pageId),
      cortexIds: cortexIds.map(decode),
      weaponIds: weaponIds.map(decode),
    }))
    .map(({ pageId, cortexIds, weaponIds }) => ({
      pageId,
      ...(cortexIds.length === 0 ? {} : { cortexIds }),
      ...(weaponIds.length === 0 ? {} : { weaponIds }),
      hidden: true,
    }));
}

function partitionBy(slice, string) {
  var strings = [];

  for (let i = 0; i < string.length; i += slice) {
    strings[strings.length] = string.slice(i, i + slice);
  }

  return strings;
}
