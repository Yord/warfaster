const menu = {
  toggleCollapsed: (state) => {
    state.ui.menuCollapsed = !state.ui.menuCollapsed;
  },
};

const wildCardModels = {
  set: (wildCards) =>
    (state) => {
      for (const wildCard of wildCards) {
        state.data.wildCardModels[wildCard.faction] = wildCard.models;
      }
    },
  findModelPage: (page) =>
    (state) =>
      Object.values(state.data.wildCardModels)
        .flat()
        .find((model) => model.Name.page === page),
};

export { menu, wildCardModels };
