const cypherCodecs = {
  set: (cypherCodecs) => (state) => {
    state.cypherCodecs = cypherCodecs;
  },
  selectAll: (state) => state.cypherCodecs,
  selectAllCypherPages: (state) =>
    state.cypherCodecs.map((codec) => codec.Cypher.page),
};

export { cypherCodecs };
