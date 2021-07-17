import createSagaMiddleware from "redux-saga";
import { all, put } from "redux-saga/effects";
import { FetchWikiPage, RefreshWikiPages } from "./actions";
import {
  cacheWikiPages,
  removeUnsuccessfullyParsedPages,
  updateCache,
} from "./cacheWikiPages";
import { parseWikiPages } from "./parseWikiPages";

const initSaga = () => createSagaMiddleware();

const runSaga = (saga) => {
  function* fetchSampleData() {
    const fetchWarcaster = function* () {
      yield put(FetchWikiPage({ page: "Warcaster", type: "faction" }));
    };

    const fetchAeternusContinuum = function* () {
      yield put(
        FetchWikiPage({ page: "Aeternus_Continuum", type: "factionModels" })
      );
    };

    const fetchMarcherWorlds = function* () {
      yield put(
        FetchWikiPage({ page: "Marcher_Worlds", type: "factionModels" })
      );
    };

    const fetchVassalRaiders = function* () {
      yield put(FetchWikiPage({ page: "Vassal_Raiders", type: "model" }));
    };

    const fetchAenigma = function* () {
      yield put(FetchWikiPage({ page: "Aenigma", type: "model" }));
    };

    const fetchScourge = function* () {
      yield put(FetchWikiPage({ page: "Scourge", type: "model" }));
    };

    const fetchDefensePylon = function* () {
      yield put(FetchWikiPage({ page: "Defense_Pylon", type: "model" }));
    };

    const fetchCypherCodecs = function* () {
      yield put(FetchWikiPage({ page: "Cypher_Codecs", type: "cypherCodecs" }));
    };

    const fetchAcheronianVenediction = function* () {
      yield put(
        FetchWikiPage({ page: "Acheronian_Venediction", type: "cypher" })
      );
    };

    const fetchAggressionTheorem = function* () {
      yield put(FetchWikiPage({ page: "Aggression_Theorem", type: "cypher" }));
    };

    const fetchAnnihilationVector = function* () {
      yield put(FetchWikiPage({ page: "Annihilation_Vector", type: "cypher" }));
    };

    const fetchAtrophicDecomposer = function* () {
      yield put(FetchWikiPage({ page: "Atrophic_Decomposer", type: "cypher" }));
    };

    yield all([
      fetchWarcaster(),
      fetchAeternusContinuum(),
      fetchMarcherWorlds(),
      fetchVassalRaiders(),
      fetchAenigma(),
      fetchScourge(),
      fetchDefensePylon(),
      fetchCypherCodecs(),
      fetchAcheronianVenediction(),
      fetchAggressionTheorem(),
      fetchAnnihilationVector(),
      fetchAtrophicDecomposer(),
    ]);
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
      refresh(),
    ]);
  };

  saga.run(root);
};

export { initSaga, runSaga };
