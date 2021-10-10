import {
  cypherCodecs,
  factionModels,
  menu,
  models,
  wildCardModels,
} from "../dataAccess";
import { Cyphers } from "./Cyphers";
import { WikiPages } from "./WikiPages";
import { Factions } from "./Factions";
import { immer, immerPipe } from "./utils";

const init = immerPipe(WikiPages.init, Factions.init, Cyphers.init);

const dispatch = immer(({ type, payload }) => {
  switch (type) {
    case "CYPHER_CODECS/SET": {
      return cypherCodecs.set(payload.cypherCodecs);
    }
    case "Cyphers.set": {
      return (state) => redirect(Cyphers.dispatch)(state, { type, payload });
    }
    case "Factions.set": {
      return (state) => redirect(Factions.dispatch)(state, { type, payload });
    }
    case "FACTION_MODELS/SET": {
      return factionModels.set(payload.page, payload.factionModels);
    }
    case "MODEL/SET": {
      return models.set(payload.page, payload.model);
    }
    case "WILD_CARDS/SET": {
      return wildCardModels.set(payload.wildCards);
    }
    case "WikiPages.removeUnsuccessfullyParsedPages": {
      return (state) => redirect(WikiPages.dispatch)(state, { type, payload });
    }
    case "WikiPages.setPage": {
      return (state) => redirect(WikiPages.dispatch)(state, { type, payload });
    }
    case "WikiPages.removePage": {
      return (state) => redirect(WikiPages.dispatch)(state, { type, payload });
    }
    // UI
    case "DRAGGING/SET": {
      return (state) => {
        state.ui.dragging = payload.dragging;
      };
    }
    case "LIST/ADD_CARD": {
      return (state) => {
        state.ui.lists[state.ui.lists.length - 1].cards.push(payload.page);
      };
    }
    case "LISTS/REMOVE_CARD": {
      const { source } = payload;
      return (state) => {
        state.ui.lists[source.listIndex].cards.splice(source.cardIndex, 1);
      };
    }
    case "LISTS/UPDATE_CARD": {
      const { destination, source } = payload;
      return (state) => {
        const card = state.ui.lists[source.listIndex].cards[source.cardIndex];
        state.ui.lists[source.listIndex].cards.splice(source.cardIndex, 1);
        state.ui.lists[destination.listIndex].cards.splice(
          destination.cardIndex,
          0,
          card
        );
      };
    }
    case "MENU/TOGGLE_COLLAPSE": {
      return menu.toggleCollapsed;
    }
    default: {
      return (state) => state;
    }
  }
});

export { dispatch, init };

function redirect(functionByMessage) {
  return (state, action) =>
    immer(({ type, payload }) => {
      const f = functionByMessage[type] || ((state) => state);
      return (state) => f(state, payload);
    })(state, action);
}
