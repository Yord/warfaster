import { StateShard } from "./utils";

const Cyphers = StateShard("Cyphers", init, { set }, { select });

export { Cyphers };

function init(state) {
  if (!state.data) {
    state.data = {};
  }

  state.data.cyphers = {};
}

// Actions

function set(state, { page, cypher }) {
  const cyphers = select(state);
  cyphers[page] = cypher;
}

// Selectors

function select(state) {
  return state.data.cyphers;
}
