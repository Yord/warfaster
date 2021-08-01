import { put, take, select } from "redux-saga/effects";
import { AddCard, SetDragging } from "../store/actions";
import { cypherCodecs, factionModels } from "../store/dataAccess";

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

      yield put({
        type: "LISTS/UPDATE_CARD",
        payload: {
          source: { listIndex: sourceListIndex, cardIndex: sourcePosition },
          destination: {
            listIndex: destinationListIndex,
            cardIndex: destinationPosition,
          },
        },
      });
    }
  }
}

function* removeCards() {
  while (true) {
    const { payload } = yield take("CARD/DRAG_ENDED");
    const { reason, source, destination } = payload;
    console.log({ reason, source, destination });
    if (reason === "DROP" && destination.droppableId.startsWith("trash")) {
      const listIndex = parseInt(source.droppableId.replace("cards_", ""), 10);
      const cardIndex = source.index;

      yield put({
        type: "LISTS/REMOVE_CARD",
        payload: {
          source: { listIndex, cardIndex },
        },
      });
    }
  }
}

function* addCard() {
  while (true) {
    const { payload } = yield take("MENU_ITEM/CLICKED");
    const { key } = payload;
    const model = yield select(factionModels.findModelPage(key));
    const cypher = yield select(cypherCodecs.findCypherCodec(key));
    if (model || cypher) yield put(AddCard({ page: key }));
  }
}

function* setDraggingTrue() {
  while (yield take("CARD/DRAG_STARTED")) {
    yield put(SetDragging({ dragging: true }));
  }
}

function* setDraggingFalse() {
  while (yield take("CARD/DRAG_ENDED")) {
    yield put(SetDragging({ dragging: false }));
  }
}

export { addCard, removeCards, setDraggingFalse, setDraggingTrue, updateCards };
