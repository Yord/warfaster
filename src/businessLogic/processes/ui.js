import { put, select, take } from "redux-saga/effects";
import { AddCard, SetDragging } from "../../messages";
import { CypherCodecs } from "../../state/objects/CypherCodecs";
import { Dragging } from "../../state/objects/Dragging";
import { FactionModels } from "../../state/objects/FactionModels";
import { WildCardModels } from "../../state/objects/WildCardModels";

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
    const wildCard = yield select(WildCardModels.findModelPage(page));
    const cypher = yield select(CypherCodecs.findCypherCodec(page));
    if (model || wildCard || cypher) yield put(AddCard({ page }));
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

export { addCard, removeCards, setDraggingFalse, setDraggingTrue, updateCards };
