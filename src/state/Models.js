import { ReduxGroup } from "./utils";

const Models = ReduxGroup("Models", init, { set }, { select });

export { Models };

function init(state) {
  if (!state.data) {
    state.data = {};
  }

  state.data.models = {};
}

// Actions

function set(state, { page, model }) {
  const models = select(state);
  models[page] = model;
}

// Selectors

function select(state) {
  return state.data.models;
}
