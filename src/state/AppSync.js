import { StateShard } from "./utils";

const AppSync = StateShard("AppSync", init, { done }, {}, { selectDone });

export { AppSync };

function init(state) {
  if (!state.data) {
    state.data = {};
  }

  if (!state.data.sync) {
    state.data.sync = {};
  }

  state.data.sync.done = false;
}

// Actions

function done(state) {
  const sync = select(state);
  sync.done = true;
}

// Selectors

function select(state) {
  return state.data.sync;
}

function selectDone(state) {
  const sync = select(state);
  return sync.done;
}
