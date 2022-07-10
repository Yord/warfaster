import { StateShard } from "./utils";

const FactionModels = StateShard(
  "FactionModels",
  init,
  { set },
  { select, selectModelPages, selectByPage }
);

export { FactionModels };

function init(state) {
  if (!state.data) {
    state.data = {};
  }

  state.data.factionModels = {};
}

// Actions

function set(state, { page, factionModels }) {
  const models = select(state);
  if (!models[page]) {
    models[page] = [];
  }
  models[page] = [...models[page], ...factionModels];
}

// Selectors

function select(state) {
  return state.data.factionModels;
}

function selectModelPages(state) {
  const models = select(state);
  return Object.values(models)
    .flat()
    .map((model) => model.Name.page);
}

function selectByPage(state, page) {
  const models = select(state);
  return Object.values(models)
    .flat()
    .find((model) => model.Name.page === page);
}
