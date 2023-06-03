import { StateShard } from "./utils";

const WarjackWeapons = StateShard(
  "WarjackWeapons",
  init,
  { set },
  {},
  { select, selectByPage }
);

export { WarjackWeapons };

function init(state) {
  if (!state.data) {
    state.data = {};
  }

  state.data.warjackWeapons = {};
}

// Actions

function set(state, { page, warjackWeapon }) {
  const warjackWeapons = select(state);
  warjackWeapons[page] = warjackWeapon;
}

// Selectors

function select(state) {
  return state.data.warjackWeapons;
}

function selectByPage(state, page) {
  const warjackWeapons = select(state);
  return warjackWeapons[page];
}
