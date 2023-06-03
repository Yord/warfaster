import { StateShard } from "./utils";

const Models = StateShard(
  "Models",
  init,
  { set },
  {},
  { select, selectByPage }
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
  const models = select(state);
  models[page] = model;
}

// Selectors

function select(state) {
  return state.data.models;
}

function selectByPage(state, page) {
  const models = select(state);
  return Object.values(models)
    .flat()
    .find((model) => model.name.page === page);
}
