import { ReduxGroup } from "./utils";

const Cyphers = ReduxGroup("Cyphers", init, { set }, { selectAll });

export { Cyphers };

function init(state) {
  if (!state.data) {
    state.data = {};
  }

  state.data.cyphers = {};
}

// Actions

function set(state, { page, cypher }) {
  state.data.cyphers[page] = cypher;
}

// Selectors

function selectAll(state) {
  return state.data.cyphers;
}
