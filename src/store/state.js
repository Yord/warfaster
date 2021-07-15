import produce from "immer";
import {
  cypherCodecs,
  cyphers,
  factionModels,
  factions,
  models,
  wikiPage,
} from "./dataAccess";

const identity = (a) => a;

const immer = (f) => (state, action) => produce(f(action) || identity)(state);

const root = immer(({ type, payload }) => {
  switch (type) {
    case "F":
      return eval(payload.f);
    case "CYPHER_CODECS/SET":
      return cypherCodecs.set(payload.cypherCodecs);
    case "CYPHER/SET":
      return cyphers.set(payload.page, payload.cypher);
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
    case "WIKI_PAGE/REMOVE":
      return wikiPage.remove(payload.page);
  }
});

export { root };
