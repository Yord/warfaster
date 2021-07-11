import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./view/App";
import { initSaga, runSaga } from "./saga";
import { initStore } from "./store";

const saga = initSaga();
const store = initStore(saga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

runSaga(saga);
