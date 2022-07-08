import { Cyphers } from "./Cyphers";
import { CypherCodecs } from "./CypherCodecs";
import { Factions } from "./Factions";
import { FactionModels } from "./FactionModels";
import { Menu } from "./Menu";
import { Models } from "./Models";
import { WikiPages } from "./WikiPages";
import { WildCardModels } from "./WildCardModels";
import { immer, initAll } from "./utils";

const init = initAll(
  Cyphers,
  CypherCodecs,
  Factions,
  FactionModels,
  Menu,
  Models,
  WikiPages,
  WildCardModels
);

const dispatch = immer(({ type, payload }) => {
  const redirectTo = redirect({ type, payload });
  switch (type) {
    case "CypherCodecs.set": {
      return redirectTo(CypherCodecs);
    }
    case "Cyphers.set": {
      return redirectTo(Cyphers);
    }
    case "Factions.set": {
      return redirectTo(Factions);
    }
    case "FactionModels.set": {
      return redirectTo(FactionModels);
    }
    case "Models.set": {
      return redirectTo(Models);
    }
    case "WildCardModels.set": {
      return redirectTo(WildCardModels);
    }
    case "WikiPages.removeUnsuccessfullyParsedPages": {
      return redirectTo(WikiPages);
    }
    case "WikiPages.setPage": {
      return redirectTo(WikiPages);
    }
    case "WikiPages.removePage": {
      return redirectTo(WikiPages);
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
    case "Menu.toggleCollapsed": {
      return redirectTo(Menu);
    }
    default: {
      return (state) => state;
    }
  }
});

export { dispatch, init };

function redirect(action) {
  return (obj) => (state) =>
    immer(({ type, payload }) => {
      const f = obj.dispatch[type] || ((state) => state);
      return (state) => f(state, payload);
    })(state, action);
}
