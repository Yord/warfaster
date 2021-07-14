import produce from "immer";
import { wikiPage } from "./wikiPage";
import { factions } from "./factions";
import { factionModels } from "./factionModels";
import { models } from "./models";

const identity = (a) => a;

const immer = (f) => (state, action) => produce(f(action) || identity)(state);

const root = immer(({ type, payload }) => {
  switch (type) {
    case "FACTIONS/SET":
      return factions.set(payload.factions);
    case "FACTION_MODELS/SET":
      return factionModels.set(payload.factionModels);
    case "MODEL/SET":
      return models.set(payload.page, payload.model);
    case "UNSUCCESSFULLY_PARSED_PAGES/REMOVE":
      return wikiPage.removeUnsuccessfullyParsedPages;
    case "WIKI_PAGE/ADD":
      return wikiPage.add(payload.page, payload.type, payload.data);
  }
});

export { root };
