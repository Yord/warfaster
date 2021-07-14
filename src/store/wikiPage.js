import { unixMillisNow } from "../core/time";
import { factions } from "./factions";
import { factionModels } from "./factionModels";
import { models } from "./models";
import { cypherCodecs } from "./cypherCodecs";

const wikiPage = {
  add: (page, type, data) => (state) => {
    state.pages[page] = {
      ...data,
      type,
      lastVisit: unixMillisNow(),
    };
  },
  removeUnsuccessfullyParsedPages: (state) => {
    const cypherCodecsList = cypherCodecs.selectAll(state);
    const factionsPages = factions.selectPages(state);
    const factionModelPages = factionModels.selectAll(state);
    const modelPages = models.selectAll(state);

    const pages = Object.entries(state.pages);
    for (const [page, { type }] of pages) {
      const unsuccessfullyParsedPage =
        (type === "faction" && Object.keys(factionsPages).length === 0) ||
        (type === "factionModels" && !factionModelPages[page]) ||
        (type === "model" && !modelPages[page]) ||
        (type === "cypherCodecs" && cypherCodecsList.length === 0) ||
        false;

      if (unsuccessfullyParsedPage) {
        delete state.pages[page];
      }
    }
  },
  select: (page) => (state) => state.pages[page],
};

export { wikiPage };
