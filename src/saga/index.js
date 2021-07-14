import createSagaMiddleware from "redux-saga";
import { all, put } from "redux-saga/effects";
import { fetchWikiPage } from "./fetchWikiPage";
import { parseFactions } from "./parseFactions";
import { parseFactionModels } from "./parseFactionModels";
import { parseCypher } from "./parseCypher";
import { parseModel } from "./parseModel";
import { parseCypherCodecs } from "./parseCypherCodecs";
import { removeUnsuccessfullyParsedPages } from "./removeUnsuccessfullyParsedPages";
import { FetchWikiPage } from "./actions";

const initSaga = () => createSagaMiddleware();

const runSaga = (saga) => {
  const fetchWarcaster = function* () {
    yield put(FetchWikiPage({ page: "Warcaster", type: "faction" }));
  };

  const fetchAeternusContinuum = function* () {
    yield put(
      FetchWikiPage({ page: "Aeternus_Continuum", type: "factionModels" })
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

  const root = function* () {
    yield all([
      removeUnsuccessfullyParsedPages(),
      //fetchWarcaster(),
      //fetchAeternusContinuum(),
      //fetchVassalRaiders(),
      //fetchAenigma(),
      //fetchScourge(),
      //fetchDefensePylon(),
      fetchCypherCodecs(),
      fetchAcheronianVenediction(),
      fetchAggressionTheorem(),
      fetchAnnihilationVector(),
      fetchAtrophicDecomposer(),
      fetchWikiPage(),
      parseFactions(),
      parseFactionModels(),
      parseModel(),
      parseCypherCodecs(),
      parseCypher(),
    ]);
  };

  saga.run(root);
};

export { initSaga, runSaga };
