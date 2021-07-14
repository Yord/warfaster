import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { root } from "./state";

const initStore = (saga) => {
  const initialState = {
    pages: {},
    factions: {},
    factionModels: {},
    models: {},
    cypherCodecs: [],
  };

  const persistedState = localStorage.getItem("reduxState")
    ? JSON.parse(localStorage.getItem("reduxState"))
    : initialState;

  const composedEnhancers = composeWithDevTools(applyMiddleware(saga));
  const store = createStore(root, persistedState, composedEnhancers);

  store.subscribe(() => {
    localStorage.setItem("reduxState", JSON.stringify(store.getState()));
  });

  return store;
};

export { initStore };
