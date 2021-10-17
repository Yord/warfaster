import { put, select, take } from "redux-saga/effects";
import { AddCard, SetDragging } from "../../messages";
import { wildCardModels } from "../../state/dataAccess";
import { CypherCodecs } from "../../state/objects/CypherCodecs";
import { FactionModels } from "../../state/objects/FactionModels";

function* updateCards() {
  while (true) {
    const { payload } = yield take("CARD/DRAG_ENDED");
    const { reason, source, destination } = payload;
    if (reason === "DROP" && destination.droppableId.startsWith("cards_")) {
      const sourceListIndex = parseInt(
        source.droppableId.replace("cards_", ""),
        10,
      );
      const sourcePosition = source.index;

      const destinationListIndex = parseInt(
        destination.droppableId.replace("cards_", ""),
        10,
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
    const page = key.split(":")[1];
    const model = yield select(FactionModels.findModelPage(page));
    const wildCard = yield select(wildCardModels.findModelPage(page));
    const cypher = yield select(CypherCodecs.findCypherCodec(page));
    if (model || wildCard || cypher) yield put(AddCard({ page }));
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
