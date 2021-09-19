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

const factions = {
  set: (factions) => (state) => {
    state.data.factions = factions;
  },
  selectPages: (state) => Object.keys(state.data.factions),
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

const wikiPage = {
  add: (page, type, data) => (state) => {
    state.data.pages[page] = {
      page,
      type,
      ...data,
    };
  },
  remove: (page) => (state) => {
    delete state.data.pages[page];
  },
  removeUnsuccessfullyParsedPages: (state) => {
    const cypherCodecsList = cypherCodecs.selectAll(state);
    const factionsPages = factions.selectPages(state);
    const factionModelPages = factionModels.selectAll(state);
    const modelPages = models.selectAll(state);
    const cypherPages = cyphers.selectAll(state);

    const pages = Object.entries(state.data.pages);
    for (const [page, { type }] of pages) {
      const unsuccessfullyParsedPage =
        (type === "faction" && Object.keys(factionsPages).length === 0) ||
        (type === "factionModels" && !factionModelPages[page]) ||
        (type === "wildCardModels" &&
          Object.keys(state.data.wildCardModels).length === 0) ||
        (type === "model" && !modelPages[page]) ||
        (type === "cypherCodecs" && cypherCodecsList.length === 0) ||
        (type === "cypher" && !cypherPages[page]) ||
        false;

      if (unsuccessfullyParsedPage) {
        delete state.data.pages[page];
      }
    }
  },
  select: (page) => (state) => state.data.pages[page],
  selectGivenPageIds: (pageIds) => (state) =>
    Object.values(state.data.pages).filter((page) =>
      pageIds.includes(page.pageid)
    ),
  selectPageIds: (state) =>
    Object.values(state.data.pages).map((page) => page.pageid),
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

export {
  cypherCodecs,
  cyphers,
  factionModels,
  factions,
  menu,
  models,
  wikiPage,
  wildCardModels,
};
