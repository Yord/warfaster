const cyphers = {
  set: (page, cypher) => (state) => {
    state.cyphers[page] = cypher;
  },
  selectAll: (state) => state.cyphers,
};

export { cyphers };
