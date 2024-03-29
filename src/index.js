import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import "./index.css";
import App from "./ui/App";
import { processes } from "./businessLogic/processes";
import { dispatch, state } from "./state";

const saga = initSaga();
const store = initStore(saga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

saga.run(processes);

function initStore(saga) {
  const reset = document.location.search === "?reset";

  const persistedState = localStorage.getItem("reduxState")
    ? JSON.parse(localStorage.getItem("reduxState"))
    : state;

  const latestState =
    !reset && new Date(persistedState.version) >= new Date(state.version)
      ? persistedState
      : state;

  const composedEnhancers = composeWithDevTools(applyMiddleware(saga));
  const store = createStore(dispatch, latestState, composedEnhancers);

  store.subscribe(() => {
    localStorage.setItem("reduxState", JSON.stringify(store.getState()));
  });

  return store;
}

function initSaga() {
  return createSagaMiddleware();
}
