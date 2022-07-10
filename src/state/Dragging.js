import { StateShard } from "./utils";

const Dragging = StateShard(
  "Dragging",
  init,
  { activate, deactivate },
  { select }
);

export { Dragging };

function init(state) {
  if (!state.ui) {
    state.ui = {};
  }

  state.ui.dragging = false;
}

// Actions

function activate(state) {
  state.ui.dragging = true;
}

function deactivate(state) {
  state.ui.dragging = false;
}

// Selectors

function select(state) {
  return state.ui.dragging;
}
