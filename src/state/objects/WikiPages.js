import {
  cypherCodecs,
  cyphers,
  factionModels,
  factions,
  models,
} from "../dataAccess";
import { ReduxGroup } from "./utils";

const WikiPages = ReduxGroup(
  "WikiPages",
  init,
  {
    setPage,
    removePage,
    removeUnsuccessfullyParsedPages,
  },
  {
    selectPageByPage,
    selectPagesByPageIds,
    selectPageIds,
  }
);

export { WikiPages };

function init(state) {
  if (!state.data) {
    state.data = {};
  }

  state.data.pages = {};
}

// Actions

function setPage(state, { page, type, data }) {
  data.page = page;
  data.type = type;
  state.data.pages[page] = data;
}

function removePage(state, { page }) {
  delete state.data.pages[page];
}

function removeUnsuccessfullyParsedPages(state, {}) {
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
}

// Selectors

function selectPageByPage(state, page) {
  return state.data.pages[page];
}

function selectPagesByPageIds(state, pageIds) {
  return Object.values(state.data.pages).filter((page) =>
    pageIds.includes(page.pageid)
  );
}

function selectPageIds(state) {
  return Object.values(state.data.pages).map((page) => page.pageid);
}
