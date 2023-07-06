import { StateShard } from "./utils";

const ListIndex = StateShard("ListIndex", init, { set }, {}, { select });

export { ListIndex };

function init(state) {
  if (!state.ui) {
    state.ui = {};
  }

  state.ui.listIndex = 0;
}

// Actions

function set(state, { listIndex }) {
  state.ui.listIndex = listIndex;
}

// Selectors

function select(state) {
  return state.ui.listIndex;
}
