import { all, put, select, take } from "redux-saga/effects";
import { CypherCodecs } from "../../state/CypherCodecs";
import { Dragging } from "../../state/Dragging";
import { FactionModels } from "../../state/FactionModels";
import { Lists } from "../../state/Lists";
import { WildCardModels } from "../../state/WildCardModels";

function* ui() {
  yield all([
    addCard(),
    removeCards(),
    setDraggingFalse(),
    setDraggingTrue(),
    updateCards(),
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
    if (model || wildCard || cypher) yield put(Lists.addCard({ page }));
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
