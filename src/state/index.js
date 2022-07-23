import { AppSync } from "./AppSync";
import { Cyphers } from "./Cyphers";
import { CypherCodecs } from "./CypherCodecs";
import { Dragging } from "./Dragging";
import { Factions } from "./Factions";
import { FactionModels } from "./FactionModels";
import { Lists } from "./Lists";
import { Models } from "./Models";
import { PageIds } from "./PageIds";
import { Url } from "./Url";
import { WikiPages } from "./WikiPages";
import { WildCardModels } from "./WildCardModels";
import { immer, initAll } from "./utils";

const objects = [
  AppSync,
  CypherCodecs,
  Cyphers,
  Factions,
  FactionModels,
  Models,
  PageIds,
  Url,
  WildCardModels,
  WikiPages,
  // UI
  Dragging,
  Lists,
];

const state = initAll(...objects)({});

const dispatch = immer(({ type, payload }) => {
  const namespaces = Object.fromEntries(
    objects.map((group) => [group.namespace, group])
  );

  const namespace = type.substring(0, type.indexOf("."));
  if (namespace && namespaces[namespace]) {
    return redirect({ type, payload }, namespaces[namespace]);
  }
  return (state) => state;
});

export { dispatch, state };

function redirect(action, obj) {
  return (state) =>
    immer(({ type, payload }) => {
      const f = obj.dispatch[type] || ((state, payload) => state);
      return (state) => f(state, payload);
    })(state, action);
}
