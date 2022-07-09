import { ReduxGroup } from "./utils";

const FactionModels = ReduxGroup(
  "FactionModels",
  init,
  {
    set,
  },
  {
    selectAll,
    selectAllModelPages,
    findModelPage,
  }
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
  if (!state.data.factionModels[page]) {
    state.data.factionModels[page] = [];
  }
  state.data.factionModels[page] = [
    ...state.data.factionModels[page],
    ...factionModels,
  ];
}

// Selectors

function selectAll(state) {
  return state.data.factionModels;
}

function selectAllModelPages(state) {
  return Object.values(state.data.factionModels)
    .flat()
    .map((model) => model.Name.page);
}

function findModelPage(state, page) {
  return Object.values(state.data.factionModels)
    .flat()
    .find((model) => model.Name.page === page);
}
