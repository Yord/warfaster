import { StateShard } from "./utils";

const CadreModels = StateShard(
  "CadreModels",
  init,
  { set, setForCadrePageId },
  {},
  { select, selectCadreModelsByPageId }
);

export { CadreModels };

function init(state) {
  if (!state.data) {
    state.data = {};
  }

  state.data.cadreModels = {};
}

// Actions

function set(state, { cadreModels }) {
  state.data.cadreModels = cadreModels;
}

function setForCadrePageId(state, { cadrePageId, cadreModels }) {
  select(state)[cadrePageId] = cadreModels;
}

// Selectors

function select(state) {
  return state.data.cadreModels;
}

function selectCadreModelsByPageId(state, pageId) {
  const cadreModels = select(state);
  return cadreModels[pageId];
}
