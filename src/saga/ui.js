import { put, take } from "redux-saga/effects";
import { AddCard } from "../store/actions";

function* updateCards() {
  while (true) {
    const { payload } = yield take("CARD/DRAG_ENDED");
    const { reason, source, destination } = payload;
    if (reason === "DROP") {
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

function* addCard() {
  while (true) {
    const { payload } = yield take("MENU_ITEM/CLICKED");
    const { key } = payload;
    yield put(AddCard({ page: key }));
  }
}

export { addCard, updateCards };
