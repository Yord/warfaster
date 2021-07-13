import createSagaMiddleware from "redux-saga";
import { all, put } from "redux-saga/effects";
import { fetchWikiPage } from "./fetchWikiPage";
import { parseFactions } from "./parseFactions";
import { parseFactionModels } from "./parseFactionModels";
import { FetchWikiPage } from "./actions";

const initSaga = () => createSagaMiddleware();

const runSaga = (saga) => {
  const fetchWarcaster = function* () {
    yield put(FetchWikiPage({ page: "Warcaster" }));
  };

  const fetchAeternusContinuum = function* () {
    yield put(FetchWikiPage({ page: "Aeternus_Continuum" }));
  };

  const root = function* () {
    yield all([
      fetchWarcaster(),
      fetchAeternusContinuum(),
      fetchWikiPage(),
      parseFactions(),
      parseFactionModels(),
    ]);
  };

  saga.run(root);
};

export { initSaga, runSaga };
