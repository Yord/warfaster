import { eventChannel } from "redux-saga";
import { all, put, select, take } from "redux-saga/effects";
import { CypherCodecs } from "../../state/CypherCodecs";
import { Dragging } from "../../state/Dragging";
import { FactionModels } from "../../state/FactionModels";
import { Lists } from "../../state/Lists";
import { PageIds } from "../../state/PageIds";
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
  ]);
}

export { ui };

function* updateCards() {
  while (true) {
    const { payload } = yield take("CARD/DRAG_ENDED");
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
        Lists.updateCard({
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
    const { payload } = yield take("CARD/DRAG_ENDED");
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
    const { payload } = yield take("MENU_ITEM/CLICKED");
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
  while (yield take("CARD/DRAG_STARTED")) {
    yield put(Dragging.activate());
  }
}

function* setDraggingFalse() {
  while (yield take("CARD/DRAG_ENDED")) {
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
          [`l${index}`]: list.title,
          [`c${index}`]: list.cards.reduce(
            (acc, card) =>
              acc + toBase62(card.pageId).padStart(codeLength, "0"),
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
        .filter((key) => key.match(/^l[\d]+$/))
        .map((key) => key.substring(1))
        .sort();

      const lists = titleIndexes.map((index) => ({
        title: params["l" + index],
        cards: partitionBy(exponent, params["c" + index] || "")
          .map((pageId) => pageId.replace(/^0+/, "") || "0")
          .map(fromBase62)
          .map((pageId) => ({
            pageId: parseInt(pageId, 10),
            hidden: true,
          })),
      }));

      yield put(Lists.set({ lists }));
    }
  }
}

function partitionBy(slice, string) {
  var strings = [];

  for (let i = 0; i < string.length; i += slice) {
    strings[strings.length] = string.slice(i, i + slice);
  }

  return strings;
}
