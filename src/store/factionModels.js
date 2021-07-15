const factionModels = {
  set: (factionModels) => (state) => {
    state.data.factionModels = factionModels;
  },
  selectAll: (state) => state.data.factionModels,
  selectAllModelPages: (state) =>
    Object.values(state.data.factionModels)
      .flat()
      .map((model) => model.Name.page),
};

export { factionModels };
