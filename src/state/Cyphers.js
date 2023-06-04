import { StateShard } from "./utils";

const Cyphers = StateShard(
  "Cyphers",
  init,
  { setForPage },
  {},
  { selectByPage }
);

export { Cyphers };

function init(state) {
  if (!state.data) {
    state.data = {};
  }

  state.data.cyphers = {};
}

// Actions

function setForPage(state, { page, cypher }) {
  const cyphers = select(state);
  cyphers[page] = cypher;
}

// Selectors

function select(state) {
  return state.data.cyphers;
}

function selectByPage(state, page) {
  const cyphers = select(state);
  return Object.values(cyphers)
    .flat()
    .find((cypher) => cypher.name.page === page);
}
