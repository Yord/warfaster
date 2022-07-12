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
  yield put(FetchWikiPage({ page: "Warcaster", type: "faction" }));
  yield put(
    FetchWikiPage({ page: "Aeternus_Continuum", type: "factionModels" })
  );
  yield put(FetchWikiPage({ page: "Empyrean", type: "factionModels" }));
  yield put(FetchWikiPage({ page: "Marcher_Worlds", type: "factionModels" }));
  yield put(
    FetchWikiPage({ page: "Iron_Star_Alliance", type: "factionModels" })
  );
  yield put(FetchWikiPage({ page: "Wild_Card", type: "wildCardModels" }));
  yield put(FetchWikiPage({ page: "Cypher_Codecs", type: "cypherCodecs" }));
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
