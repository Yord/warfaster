import { StateShard } from "./utils";

const CypherCodecs = StateShard(
  "CypherCodecs",
  init,
  { set },
  {},
  { select, selectPages, selectByPage }
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

function selectPages(state) {
  const codecs = select(state);
  return codecs.map((codec) => codec.Cypher.page);
}

function selectByPage(state, page) {
  const codecs = select(state);
  return codecs.find((codec) => codec.Cypher.page === page);
}
