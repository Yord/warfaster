const factions = {
  set: (factions) => (state) => {
    state.factions = factions;
  },
  selectPages: (state) => Object.keys(state.factions),
};

export { factions };
