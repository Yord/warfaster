import createSagaMiddleware from "redux-saga";
import { all, put } from "redux-saga/effects";
import { fetchWikiPage } from "./fetchWikiPage";
import { parseFactions } from "./parseFactions";
import { parseFactionModels } from "./parseFactionModels";
import { parseModel } from "./parseModel";
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

  const root = function* () {
    yield all([
      removeUnsuccessfullyParsedPages(),
      fetchWarcaster(),
      fetchAeternusContinuum(),
      fetchVassalRaiders(),
      fetchWikiPage(),
      parseFactions(),
      parseFactionModels(),
      parseModel(),
    ]);
  };

  saga.run(root);
};

export { initSaga, runSaga };
