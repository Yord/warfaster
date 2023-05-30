import { parseCypher } from "./parseCypher";
import { parseCypherCodecs } from "./parseCypherCodecs";
import { parseFactionModels } from "./parseFactionModels";
import { parseFactions } from "./parseFactions";
import { parseModel } from "./parseModel";
import { parseVehicleOrWarjackWeapon } from "./parseVehicleOrWarjackWeapon";
import { parseWildCard } from "./parseWildCard";

const parsers = {
  parseCypher,
  parseCypherCodecs,
  parseFactionModels,
  parseFactions,
  parseModel,
  parseVehicleOrWarjackWeapon,
  parseWildCard,
};

export default parsers;
