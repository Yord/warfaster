const factionModels = {
  set: (factionModels) => (state) => {
    state.factionModels = factionModels;
  },
  selectAll: (state) => state.factionModels,
  selectAllModelPages: (state) =>
    Object.values(state.factionModels)
      .flat()
      .map((model) => model.Name.page),
};

export { factionModels };
