const factions = {
  set: (factions) => (state) => {
    state.data.factions = factions;
  },
  selectPages: (state) => Object.keys(state.data.factions),
};

export { factions };
