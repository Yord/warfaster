const cyphers = {
  set: (page, cypher) => (state) => {
    state.data.cyphers[page] = cypher;
  },
  selectAll: (state) => state.data.cyphers,
};

export { cyphers };
