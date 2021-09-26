import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./ui/App";
import { initSaga, runSaga } from "./businessLogic/processes";
import { initStore } from "./state";

const saga = initSaga();
const store = initStore(saga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

runSaga(saga);
