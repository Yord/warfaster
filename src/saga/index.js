import createSagaMiddleware from "redux-saga";
import { all, put } from "redux-saga/effects";
import { fetchWikiPage } from "./fetchWikiPage";
import { parseFactions } from "./parseFactions";
import { FetchWikiPage } from "./actions";

const initSaga = () => createSagaMiddleware();

const runSaga = (saga) => {
  const fetchWarcaster = function* () {
    yield put(FetchWikiPage({ page: "Warcaster" }));
  };

  const root = function* () {
    yield all([fetchWarcaster(), fetchWikiPage(), parseFactions()]);
  };

  saga.run(root);
};

export { initSaga, runSaga };
