const cypherCodecs = {
  set: (cypherCodecs) => (state) => {
    state.data.cypherCodecs = cypherCodecs;
  },
  selectAll: (state) => state.data.cypherCodecs,
  selectAllCypherPages: (state) =>
    state.data.cypherCodecs.map((codec) => codec.Cypher.page),
};

const cyphers = {
  set: (page, cypher) => (state) => {
    state.data.cyphers[page] = cypher;
  },
  selectAll: (state) => state.data.cyphers,
};

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

const factions = {
  set: (factions) => (state) => {
    state.data.factions = factions;
  },
  selectPages: (state) => Object.keys(state.data.factions),
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

export { cypherCodecs, cyphers, factionModels, factions, models, wikiPage };
