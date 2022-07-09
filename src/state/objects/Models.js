import { ReduxGroup } from "./utils";

const Models = ReduxGroup(
  "Models",
  init,
  {
    set,
  },
  {
    selectAll,
  },
);

export { Models };

function init(state) {
  if (!state.data) {
    state.data = {};
  }

  state.data.models = {};
}

// Actions

function set(state, { page, model }) {
  state.data.models[page] = model;
}

// Selectors

function selectAll(state) {
  return state.data.models;
}
