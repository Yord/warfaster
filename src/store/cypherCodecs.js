const cypherCodecs = {
  set: (cypherCodecs) => (state) => {
    state.cypherCodecs = cypherCodecs;
  },
  selectAll: (state) => state.cypherCodecs,
};

export { cypherCodecs };
