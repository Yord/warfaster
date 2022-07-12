import { all, put } from "redux-saga/effects";
import { FetchWikiPage, RefreshWikiPages } from "../../messages";
import { cacheWikiPages, updateCache } from "./cacheWikiPages";
import { parseWikiPages } from "./parseWikiPages";
import {
  addCard,
  removeCards,
  setDraggingFalse,
  setDraggingTrue,
  updateCards,
} from "./ui";

function* fetchSampleData() {
  yield put(FetchWikiPage({ page: "Warcaster" }));
  yield put(FetchWikiPage({ page: "Aeternus_Continuum" }));
  yield put(FetchWikiPage({ page: "Empyrean" }));
  yield put(FetchWikiPage({ page: "Marcher_Worlds" }));
  yield put(FetchWikiPage({ page: "Iron_Star_Alliance" }));
  yield put(FetchWikiPage({ page: "Wild_Card" }));
  yield put(FetchWikiPage({ page: "Cypher_Codecs" }));
}

const refresh = function* () {
  yield put(RefreshWikiPages());
};

const processes = function* () {
  yield all([
    updateCache(),
    cacheWikiPages(),
    parseWikiPages(),
    fetchSampleData(),
    updateCards(),
    removeCards(),
    addCard(),
    setDraggingFalse(),
    setDraggingTrue(),
    refresh(),
  ]);
};

export { processes };
