import createSagaMiddleware from "redux-saga";
import { all, put } from "redux-saga/effects";
import { FetchWikiPage, RefreshWikiPages } from "./actions";
import {
  cacheWikiPages,
  removeUnsuccessfullyParsedPages,
  updateCache,
} from "./cacheWikiPages";
import { parseWikiPages } from "./parseWikiPages";
import { addCard, updateCards } from "./ui";

const initSaga = () => createSagaMiddleware();

const runSaga = (saga) => {
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
    //yield put(FetchWikiPage({ page: "Vassal_Raiders", type: "model" }));
    //yield put(FetchWikiPage({ page: "Aenigma", type: "model" }));
    //yield put(FetchWikiPage({ page: "Scourge", type: "model" }));
    //yield put(FetchWikiPage({ page: "Defense_Pylon", type: "model" }));
    yield put(FetchWikiPage({ page: "Cypher_Codecs", type: "cypherCodecs" }));
    //yield put(
    //  FetchWikiPage({ page: "Acheronian_Venediction", type: "cypher" })
    //);
    //yield put(FetchWikiPage({ page: "Aggression_Theorem", type: "cypher" }));
    //yield put(FetchWikiPage({ page: "Annihilation_Vector", type: "cypher" }));
    //yield put(FetchWikiPage({ page: "Atrophic_Decomposer", type: "cypher" }));
  }

  const refresh = function* () {
    yield put(RefreshWikiPages());
  };

  const root = function* () {
    yield all([
      removeUnsuccessfullyParsedPages(),
      updateCache(),
      cacheWikiPages(),
      parseWikiPages(),
      fetchSampleData(),
      updateCards(),
      addCard(),
      refresh(),
    ]);
  };

  saga.run(root);
};

export { initSaga, runSaga };
