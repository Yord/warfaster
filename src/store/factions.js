const factions = {
  set: (factions) => (state) => {
    state.factions = factions;
  },
  select: (state) => state.factions,
};

export { factions };
