import { factions } from "./factions";
import { factionModels } from "./factionModels";
import { cyphers } from "./cyphers";
import { models } from "./models";
import { cypherCodecs } from "./cypherCodecs";

const wikiPage = {
  add: (page, type, data, lastVisit) => (state) => {
    state.data.pages[page] = {
      ...data,
      type,
      lastVisit,
    };
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
};

export { wikiPage };
