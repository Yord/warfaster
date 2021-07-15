const cypherCodecs = {
  set: (cypherCodecs) => (state) => {
    state.data.cypherCodecs = cypherCodecs;
  },
  selectAll: (state) => state.data.cypherCodecs,
  selectAllCypherPages: (state) =>
    state.data.cypherCodecs.map((codec) => codec.Cypher.page),
};

export { cypherCodecs };
