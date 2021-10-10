const cypherCodecs = {
  set: (cypherCodecs) => (state) => {
    state.data.cypherCodecs = cypherCodecs;
  },
  selectAll: (state) => state.data.cypherCodecs,
  selectAllCypherPages: (state) =>
    state.data.cypherCodecs.map((codec) => codec.Cypher.page),
  findCypherCodec: (page) => (state) =>
    state.data.cypherCodecs.find((codec) => codec.Cypher.page === page),
};

const cyphers = {
  set: (page, cypher) => (state) => {
    state.data.cyphers[page] = cypher;
  },
  selectAll: (state) => state.data.cyphers,
};

const factionModels = {
  set: (page, factionModels) => (state) => {
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
  findModelPage: (page) => (state) =>
    Object.values(state.data.factionModels)
      .flat()
      .find((model) => model.Name.page === page),
};

const menu = {
  toggleCollapsed: (state) => {
    state.ui.menuCollapsed = !state.ui.menuCollapsed;
  },
};

const models = {
  set: (page, model) => (state) => {
    state.data.models[page] = model;
  },
  selectAll: (state) => state.data.models,
};

const wildCardModels = {
  set: (wildCards) => (state) => {
    for (const wildCard of wildCards) {
      state.data.wildCardModels[wildCard.faction] = wildCard.models;
    }
  },
  findModelPage: (page) => (state) =>
    Object.values(state.data.wildCardModels)
      .flat()
      .find((model) => model.Name.page === page),
};

export { cypherCodecs, cyphers, factionModels, menu, models, wildCardModels };
