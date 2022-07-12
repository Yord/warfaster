import { all, put } from "redux-saga/effects";
import { FetchWikiPage, RefreshWikiPages } from "../../messages";
import { cacheWikiPages } from "./cacheWikiPages";
import { parseWikiPages } from "./parseWikiPages";
import { triggerFetchWikiPages } from "./triggerFetchWikiPages";
import {
  addCard,
  removeCards,
  setDraggingFalse,
  setDraggingTrue,
  updateCards,
} from "./ui";

function* fetchInitialData() {
  yield put(FetchWikiPage({ page: "Warcaster" }));
  yield put(FetchWikiPage({ page: "Wild_Card" }));
  yield put(FetchWikiPage({ page: "Cypher_Codecs" }));
}

const refresh = function* () {
  yield put(RefreshWikiPages());
};

const processes = function* () {
  yield all([
    cacheWikiPages(),
    parseWikiPages(),
    triggerFetchWikiPages(),
    fetchInitialData(),
    updateCards(),
    removeCards(),
    addCard(),
    setDraggingFalse(),
    setDraggingTrue(),
    refresh(),
  ]);
};

export { processes };
