import produce from "immer";
import {
  cypherCodecs,
  cyphers,
  factionModels,
  factions,
  menu,
  models,
  wikiPage,
} from "./dataAccess";

const identity = (a) => a;

const immer = (f) => (state, action) => produce(f(action) || identity)(state);

const root = immer(({ type, payload }) => {
  switch (type) {
    // DEV
    case "F":
      return eval(payload.f);
    // DATA
    case "CYPHER_CODECS/SET":
      return cypherCodecs.set(payload.cypherCodecs);
    case "CYPHER/SET":
      return cyphers.set(payload.page, payload.cypher);
    case "FACTIONS/SET":
      return factions.set(payload.factions);
    case "FACTION_MODELS/SET":
      return factionModels.set(payload.page, payload.factionModels);
    case "MODEL/SET":
      return models.set(payload.page, payload.model);
    case "UNSUCCESSFULLY_PARSED_PAGES/REMOVE":
      return wikiPage.removeUnsuccessfullyParsedPages;
    case "WIKI_PAGE/ADD":
      return wikiPage.add(payload.page, payload.type, payload.data);
    case "WIKI_PAGE/REMOVE":
      return wikiPage.remove(payload.page);
    // UI
    case "LISTS/UPDATE_CARD":
      const { destination, source } = payload;
      return (state) => {
        const card = state.ui.lists[source.listIndex].cards[source.cardIndex];
        state.ui.lists[source.listIndex].cards.splice(source.cardIndex, 1);
        state.ui.lists[destination.listIndex].cards.splice(
          destination.cardIndex,
          0,
          card
        );
        //console.log({ dest: [...dest] });
        //dest.splice(destination.cardIndex, 0, card);
        //console.log({ dest: [...dest] });
      };
    case "MENU/TOGGLE_COLLAPSE":
      return menu.toggleCollapsed;
    default:
      return (state) => state;
  }
});

export { root };
