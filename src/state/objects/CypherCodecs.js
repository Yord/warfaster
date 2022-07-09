import { ReduxGroup } from "./utils";

const CypherCodecs = ReduxGroup(
  "CypherCodecs",
  init,
  {
    set,
  },
  {
    selectAll,
    selectAllCypherPages,
    findCypherCodec,
  }
);

export { CypherCodecs };

function init(state) {
  if (!state.data) {
    state.data = {};
  }

  state.data.cypherCodecs = [];
}

// Actions

function set(state, { cypherCodecs }) {
  state.data.cypherCodecs = cypherCodecs;
}

// Selectors

function selectAll(state) {
  return state.data.cypherCodecs;
}

function selectAllCypherPages(state) {
  return state.data.cypherCodecs.map((codec) => codec.Cypher.page);
}

function findCypherCodec(state, page) {
  return state.data.cypherCodecs.find((codec) => codec.Cypher.page === page);
}
