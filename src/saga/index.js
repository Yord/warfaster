import createSagaMiddleware from "redux-saga";
import { all, put } from "redux-saga/effects";
import { fetchWikiPage } from "./fetchWikiPage";
import { parseFactions } from "./parseFactions";
import { parseFactionModels } from "./parseFactionModels";
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
      fetchWikiPage(),
      parseFactions(),
      parseFactionModels(),
      parseModel(),
      parseCypherCodecs(),
    ]);
  };

  saga.run(root);
};

export { initSaga, runSaga };
