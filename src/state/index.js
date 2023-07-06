import { AppSync } from "./AppSync";
import { CadreCategoryMembers } from "./CadreCategoryMembers";
import { CadreModels } from "./CadreModels";
import { Cyphers } from "./Cyphers";
import { CypherCodecs } from "./CypherCodecs";
import { EditMode } from "./EditMode";
import { Factions } from "./Factions";
import { FactionModels } from "./FactionModels";
import { ListIndex } from "./ListIndex";
import { Lists } from "./Lists";
import { Models } from "./Models";
import { PageIds } from "./PageIds";
import { ParserNames } from "./ParserNames";
import { Requests } from "./io/Requests";
import { ToggleSections } from "./ToggleSections";
import { Url } from "./Url";
import { VehicleWeapons } from "./VehicleWeapons";
import { Version } from "./Version";
import { WarjackWeapons } from "./WarjackWeapons";
import { WildCardModels } from "./WildCardModels";
import { immer, initAll } from "./utils";

const objects = [
  AppSync,
  CadreCategoryMembers,
  CadreModels,
  CypherCodecs,
  Cyphers,
  EditMode,
  Factions,
  FactionModels,
  Models,
  PageIds,
  ParserNames,
  Requests,
  ToggleSections,
  Url,
  VehicleWeapons,
  WarjackWeapons,
  WildCardModels,
  // UI
  ListIndex,
  Lists,
  // General
  Version,
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
