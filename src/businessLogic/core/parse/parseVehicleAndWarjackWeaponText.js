import { parseAnchor } from "./parsers";
import { prepareDOM } from "./utils";
import { parseDefinitionText } from "./parseModelText";

const parseVehicleAndWarjackWeaponText = (text) => {
  const doc = prepareDOM(text);

  const vehicleWeaponId = doc.querySelector("#Vehicle_Weapon");
  const warjackWeaponId = doc.querySelector("#Warjack_Weapon");

  if (vehicleWeaponId && warjackWeaponId) {
    const vehicleWeapon = parseVehicleOrWarjackWeapon(
      "#Vehicle_Weapon ~ ",
      doc
    );
    const warjackWeapon = parseVehicleOrWarjackWeapon(
      "#Warjack_Weapon ~ ",
      doc
    );

    return { vehicleWeapon, warjackWeapon };
  } else {
    const vehicleOrWarjackWeapon = parseVehicleOrWarjackWeapon("", doc);

    return { vehicleOrWarjackWeapon };
  }
};

export { parseVehicleAndWarjackWeaponText };

function parseVehicleOrWarjackWeapon(prefix, doc) {
  let res = {};

  const availableFor = [
    ...doc.querySelectorAll(`${prefix}[id^=Available_For] + p > a`),
  ].map(parseAnchor);

  res.availableFor = availableFor;

  const pointCostNode = doc.querySelector(`${prefix}[id^=Point_Cost] + p`);
  if (pointCostNode) {
    const pointCost = parseInt(pointCostNode.innerText);

    res.pointCost = pointCost;
  }

  const locationNode = doc.querySelector(`${prefix}[id^=Location] + p`);
  if (locationNode) {
    const location = locationNode.innerText.replace(/\n/g, "");

    res.location = location;
  }

  // Good special rules example: Metaperceptor
  const specialRulesP = doc.querySelector(`${prefix}[id^=Special_Rules] + p`);
  if (specialRulesP) {
    res.specialRules = parseDefinitionText(specialRulesP);
  }

  // Good weapons examples:
  // - Nova_Cannon#Warjack_Weapon (several special abilities)
  // - Protean_Forge (several attack modes)
  // - Assault_Rifle_%26_Bayonet (several weapons)
  const table = doc.querySelector(`${prefix}[id^=Weapons] + table`);

  if (table) {
    const header = [...table.querySelectorAll("tr:first-of-type td")].map(
      (td) => td.innerText.replace(/\n/g, "")
    );

    const weapons = [...table.querySelectorAll("tr:not(:first-of-type)")]
      .map((tr) => [...tr.querySelectorAll("td")])
      .flatMap((tr, index) =>
        index % 2 === 0
          ? [
              tr.map((td) =>
                [...td.childNodes]
                  .map((node) =>
                    (node.innerText || node.textContent).replace(/\n$/g, "")
                  )
                  .filter((text) => [" ", ""].indexOf(text) === -1)
              ),
            ]
          : tr.map((td) => {
              const specialRules = parseDefinitionText(td);

              if (!specialRules || Object.keys(specialRules).length === 0)
                return {};
              return { specialRules };
            })
      )
      .reduce(
        (acc, tr, index) =>
          index % 2 === 0
            ? [
                ...acc,
                tr.reduce(
                  (acc2, value, index2) => ({
                    ...acc2,
                    [header[index2]]: value.length === 1 ? value[0] : value,
                  }),
                  {}
                ),
              ]
            : [
                ...acc.slice(0, acc.length - 1),
                { ...acc[acc.length - 1], ...tr },
              ],
        []
      );
    if (weapons.length > 0) {
      res.weapons = weapons;
    }
  }

  return res;
}
