import createSagaMiddleware from "redux-saga";
import { root } from "./saga";

const initSaga = () => createSagaMiddleware();

const runSaga = (saga) => {
  saga.run(root);
};

export { initSaga, runSaga };
