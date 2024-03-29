import { StateShard } from "./utils";

const WildCardModels = StateShard(
  "WildCardModels",
  init,
  { set },
  {},
  { select, selectByPage }
);

export { WildCardModels };

function init(state) {
  if (!state.data) {
    state.data = {};
  }

  state.data.wildCardModels = {};
}

// Actions

function set(state, { wildCards }) {
  const models = select(state);
  for (const wildCard of wildCards) {
    models[wildCard.faction] = wildCard.models;
  }
}

// Selectors

function select(state) {
  return state.data.wildCardModels;
}

function selectByPage(state, page) {
  const models = select(state);
  return Object.values(models)
    .flat()
    .find((model) => model.Name.page === page);
}
