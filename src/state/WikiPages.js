import { StateShard } from "./utils";
import { Cyphers } from "./Cyphers";
import { CypherCodecs } from "./CypherCodecs";
import { Factions } from "./Factions";
import { FactionModels } from "./FactionModels";
import { Models } from "./Models";

const WikiPages = StateShard(
  "WikiPages",
  init,
  { addPage, removePage, removeUnsuccessfullyParsedPages },
  { selectPageByPage, selectPagesByPageIds, selectPageIds }
);

export { WikiPages };

function init(state) {
  if (!state.data) {
    state.data = {};
  }

  state.data.pages = {};
}

// Actions

function addPage(state, { page, type, data }) {
  const pages = select(state);
  data.page = page;
  data.type = type;
  pages[page] = data;
}

function removePage(state, { page }) {
  const pages = select(state);
  delete pages[page];
}

function removeUnsuccessfullyParsedPages(state) {
  const wikiPages = select(state);

  const cypherCodecsList = CypherCodecs.select()(state);
  const factionsPages = Factions.selectPages()(state);
  const factionModelPages = FactionModels.select()(state);
  const modelPages = Models.select()(state);
  const cypherPages = Cyphers.select()(state);

  const pages = Object.entries(wikiPages);
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
      delete pages[page];
    }
  }
}

// Selectors

function select(state) {
  return state.data.pages;
}

function selectPageByPage(state, page) {
  const pages = select(state);
  return pages[page];
}

function selectPagesByPageIds(state, pageIds) {
  const pages = select(state);
  return Object.values(pages).filter((page) => pageIds.includes(page.pageid));
}

function selectPageIds(state) {
  const pages = select(state);
  return Object.values(pages).map((page) => page.pageid);
}
