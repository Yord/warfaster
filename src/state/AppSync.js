import { StateShard } from "./utils";

const AppSync = StateShard(
  "AppSync",
  init,
  { done, addReasons },
  {},
  { selectDone, selectReasons }
);

export { AppSync };

function init(state) {
  if (!state.data) {
    state.data = {};
  }

  if (!state.data.sync) {
    state.data.sync = {};
  }

  state.data.sync.done = false;
  state.data.sync.reasons = [];
}

// Actions

function done(state) {
  const sync = select(state);
  sync.done = true;
}

function addReasons(state, { reasons }) {
  const sync = select(state);
  sync.reasons = [...sync.reasons, ...reasons];
}

// Selectors

function select(state) {
  return state.data.sync;
}

function selectDone(state) {
  const sync = select(state);
  return sync.done;
}

function selectReasons(state) {
  const sync = select(state);
  return sync.reasons;
}
