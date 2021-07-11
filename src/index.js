import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { take, put } from "redux-saga/effects";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const sagaMiddleware = createSagaMiddleware();

const initialState = { hello: "Redux" };

const rootReducer = (state, action) => {
  switch (action.type) {
    case "HELLO":
      return { ...state, hello: state.hello === "Redux" ? "Saga" : "Redux" };
    default:
      return state;
  }
};

const composedEnhancers = composeWithDevTools(applyMiddleware(sagaMiddleware));
const store = createStore(rootReducer, initialState, composedEnhancers);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

const helloSaga = function* () {
  while (true) {
    const { context } = yield take("BUTTON_CLICKED");
    yield put({ type: "HELLO", params: context });
  }
};

sagaMiddleware.run(helloSaga);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
