import { ReduxGroup } from "./utils";

const WildCardModels = ReduxGroup(
  "WildCardModels",
  init,
  {
    set,
  },
  {
    findModelPage,
  }
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
  for (const wildCard of wildCards) {
    state.data.wildCardModels[wildCard.faction] = wildCard.models;
  }
}

// Selectors

function findModelPage(state, page) {
  return Object.values(state.data.wildCardModels)
    .flat()
    .find((model) => model.Name.page === page);
}
