import { Cyphers } from "./Cyphers";
import { CypherCodecs } from "./CypherCodecs";
import { Dragging } from "./Dragging";
import { Factions } from "./Factions";
import { FactionModels } from "./FactionModels";
import { Lists } from "./Lists";
import { Menu } from "./Menu";
import { Models } from "./Models";
import { WikiPages } from "./WikiPages";
import { WildCardModels } from "./WildCardModels";
import { immer, initAll } from "./utils";

const init = initAll(
  Cyphers,
  CypherCodecs,
  Dragging,
  Factions,
  FactionModels,
  Lists,
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
    case "Dragging.activate": {
      return redirectTo(Dragging);
    }
    case "Dragging.deactivate": {
      return redirectTo(Dragging);
    }
    case "Lists.addCard": {
      return redirectTo(Lists);
    }
    case "Lists.removeCard": {
      return redirectTo(Lists);
    }
    case "Lists.updateCard": {
      return redirectTo(Lists);
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
      const f = obj.dispatch[type] || ((state, payload) => state);
      return (state) => f(state, payload);
    })(state, action);
}
