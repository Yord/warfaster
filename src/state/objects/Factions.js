import { ReduxGroup } from "./utils";

const Factions = ReduxGroup(
  "Factions",
  init,
  {
    set,
  },
  {
    selectPages,
  }
);

export { Factions };

function init(state) {
  if (!state.data) {
    state.data = {};
  }

  state.data.factions = {};
}

// Actions

function set(state, { factions }) {
  state.data.factions = factions;
}

// Selectors

function selectPages(state) {
  return Object.keys(state.data.factions);
}
