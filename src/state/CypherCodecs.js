import { StateShard } from "./utils";

const CypherCodecs = StateShard(
  "CypherCodecs",
  init,
  { set },
  {},
  { select, selectByPage }
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

function select(state) {
  return state.data.cypherCodecs;
}

function selectByPage(state, page) {
  const codecs = select(state);
  return codecs.find((codec) => codec.Cypher.page === page);
}
