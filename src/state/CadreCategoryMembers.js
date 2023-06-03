import { StateShard } from "./utils";

const CadreCategoryMembers = StateShard(
  "CadreCategoryMembers",
  init,
  { set },
  {},
  { select }
);

export { CadreCategoryMembers };

function init(state) {
  if (!state.data) {
    state.data = {};
  }

  state.data.cadreCategoryMembers = {};
}

// Actions

function set(state, { cadreCategoryMembers }) {
  state.data.cadreCategoryMembers = cadreCategoryMembers;
}

// Selectors

function select(state) {
  return state.data.cadreCategoryMembers;
}
