import { StateShard } from "./utils";

const EditMode = StateShard("EditMode", init, { toggle }, {}, { select });

export { EditMode };

function init(state) {
  if (!state.ui) {
    state.ui = {};
  }

  state.ui.editMode = false;
}

// Actions

function toggle(state) {
  const editMode = select(state);
  state.ui.editMode = !editMode;
}

// Selectors

function select(state) {
  return state.ui.editMode;
}
