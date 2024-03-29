import { StateShard } from "./utils";

const Factions = StateShard(
  "Factions",
  init,
  { set },
  {},
  { select, selectPageByText }
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

function select(state) {
  return state.data.factions;
}

function selectPageByText(state) {
  const factions = select(state);

  return Object.fromEntries(
    Object.values(factions).map(({ text, page }) => [text, page])
  );
}
