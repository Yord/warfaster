import { StateShard } from "./utils";

const FactionModels = StateShard(
  "FactionModels",
  init,
  { setForPage },
  {},
  { select, selectByPage }
);

export { FactionModels };

function init(state) {
  if (!state.data) {
    state.data = {};
  }

  state.data.factionModels = {};
}

// Actions

function setForPage(state, { page, factionModels }) {
  const models = select(state);
  models[page] = factionModels;
}

// Selectors

function select(state) {
  return state.data.factionModels;
}

function selectByPage(state, page) {
  const models = select(state);
  return Object.values(models)
    .flat()
    .find((model) => model.Name.page === page);
}
