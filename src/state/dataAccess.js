const cypherCodecs = {
  set: (cypherCodecs) =>
    (state) => {
      state.data.cypherCodecs = cypherCodecs;
    },
  selectAll: (state) => state.data.cypherCodecs,
  selectAllCypherPages: (state) =>
    state.data.cypherCodecs.map((codec) => codec.Cypher.page),
  findCypherCodec: (page) =>
    (state) =>
      state.data.cypherCodecs.find((codec) => codec.Cypher.page === page),
};

const factionModels = {
  set: (page, factionModels) =>
    (state) => {
      if (!state.data.factionModels[page]) {
        state.data.factionModels[page] = [];
      }
      state.data.factionModels[page] = [
        ...state.data.factionModels[page],
        ...factionModels,
      ];
    },
  selectAll: (state) => state.data.factionModels,
  selectAllModelPages: (state) =>
    Object.values(state.data.factionModels)
      .flat()
      .map((model) => model.Name.page),
  findModelPage: (page) =>
    (state) =>
      Object.values(state.data.factionModels)
        .flat()
        .find((model) => model.Name.page === page),
};

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

export { cypherCodecs, factionModels, menu, wildCardModels };
