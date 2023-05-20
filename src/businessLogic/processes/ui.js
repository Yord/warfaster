import { eventChannel } from "redux-saga";
import { all, put, select, take } from "redux-saga/effects";
import {
  CardDragEnded,
  CardDragStarted,
  FetchWikiPage,
  MenuItemClicked,
} from "../../messages";
import { AppSync } from "../../state/AppSync";
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
    parseListsFromQuery2(),
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

      function renderWarjackWeaponIds(warjackWeaponIds, codeLength) {
        const ids = warjackWeaponIds || [];
        let res = "";
        for (let i = 0; i < ids.length; i++) {
          const id = ids[i];
          res += (id ? toBase62(id) : "0").padStart(codeLength, "0");
        }
        return res;
      }

      const state = lists.reduce(
        (state, list, index) => ({
          ...state,
          ...(list.title ? { [`t${index}`]: list.title } : {}),
          [`l${index}`]: list.cards.reduce(
            (acc, card) =>
              acc +
              toBase62(card.pageId).padStart(codeLength, "0") +
              (card.cortexIds || card.warjackWeaponIds
                ? `(${(card.cortexIds || [])
                    .map((id) => toBase62(id).padStart(codeLength, "0"))
                    .join("")},${renderWarjackWeaponIds(
                    card.warjackWeaponIds,
                    codeLength
                  )})`
                : "") +
              (card.vehicleWeaponId
                ? `[${toBase62(card.vehicleWeaponId).padStart(
                    codeLength,
                    "0"
                  )}]`
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
    yield take(loadChannel);

    yield* parseLists();
  }
}

function* parseListsFromQuery2() {
  yield take(AppSync.done().type);

  yield* parseLists();
}

function* parseLists() {
  const urlParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlParams);

  const version = params.v;
  const exponent = parseInt(params.e, 10) || 0;

  let lists = null;
  if (version === "1" && exponent) {
    const listIndexes = Object.keys(params)
      .filter((key) => key.match(/^l[\d]+$/))
      .map((key) => parseInt(key.substring(1), 10))
      .sort((a, b) => a - b);

    lists = listIndexes.map((index) => ({
      title: params["t" + index] || "",
      cards: parseList(exponent, params["l" + index]),
    }));
  } else {
    lists = yield select(Lists.select());
  }

  // If the card is either a configured warjack or a configured vehicle, its page must be
  // fetched in order for its subtitle to be shown correctly. A warjack or vehicle can be
  // identified by having at least one cortex id, warjack weapon id or vehicle weapon id.
  for (const list of lists) {
    for (const {
      pageId,
      cortexIds,
      warjackWeaponIds,
      vehicleWeaponId,
    } of list.cards) {
      if (cortexIds || warjackWeaponIds || vehicleWeaponId) {
        const page = yield select(PageIds.selectPageByPageId(pageId));
        if (page) {
          yield put(FetchWikiPage({ page }));
        }
      }
    }
  }

  yield put(Lists.set({ lists }));
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
      const [cortexIds, warjackWeaponIds] = block.split(",");
      return parseCards(
        [
          ...cards,
          {
            pageId,
            cortexIds: partitionBy(exponent, cortexIds),
            warjackWeaponIds: partitionBy(exponent, warjackWeaponIds),
            vehicleWeaponId: [],
          },
        ],
        rest.slice(blockEnd + 1)
      );
    }

    if (rest[exponent] === "[") {
      const blockEnd = rest.indexOf("]");
      if (!blockEnd) {
        return [];
      }

      const vehicleWeaponId = rest.slice(exponent + 1, blockEnd);
      return parseCards(
        [
          ...cards,
          {
            pageId,
            cortexIds: [],
            warjackWeaponIds: [],
            vehicleWeaponId: [vehicleWeaponId],
          },
        ],
        rest.slice(blockEnd + 1)
      );
    }

    return parseCards(
      [
        ...cards,
        { pageId, cortexIds: [], warjackWeaponIds: [], vehicleWeaponId: [] },
      ],
      rest.slice(exponent)
    );
  }

  const cards = parseCards([], encodedList);

  const decode = (string) => {
    const normalizedString = string.replace(/^0+/, "") || "0";
    if (normalizedString === "0") return null;
    return parseInt(fromBase62(normalizedString), 10);
  };

  return cards
    .map(({ pageId, cortexIds, warjackWeaponIds, vehicleWeaponId }) => ({
      pageId: decode(pageId),
      cortexIds: cortexIds.map(decode),
      warjackWeaponIds: warjackWeaponIds.map(decode),
      vehicleWeaponId: vehicleWeaponId.map(decode),
    }))
    .map(({ pageId, cortexIds, warjackWeaponIds, vehicleWeaponId }) => ({
      pageId,
      ...(cortexIds.length === 0 ? {} : { cortexIds }),
      ...(warjackWeaponIds.length === 0 ? {} : { warjackWeaponIds }),
      ...(vehicleWeaponId.length === 0
        ? {}
        : { vehicleWeaponId: vehicleWeaponId[0] }),
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
