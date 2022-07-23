import { StateShard } from "./utils";

const Url = StateShard("Url", init, { set }, { select });

export { Url };

function init(state) {
  if (!state.ui) {
    state.ui = {};
  }

  state.ui.url = {};
}

// Actions

function set(state, { url }) {
  state.ui.url = url;
}

// Selectors

function select(state) {
  return state.ui.url;
}
