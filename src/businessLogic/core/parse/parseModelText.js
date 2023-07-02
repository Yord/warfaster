import { parseAnchor } from "./parsers";
import { cleanText, prepareDOM } from "./utils";

const parseModelText = (text) => {
  const doc = prepareDOM(text);

  const storeLinks = extractStoreLinks(doc);
  const release = extractText(doc, "Release", { node: "h1" });
  const lore = extractText(doc, "Lore", { node: "h1" });

  const contents = [...doc.querySelectorAll(".mw-parser-output > *")];

  // In cases where a model has more than a single card (see Phaetheon),
  // h2s are used to seperate stats. Pages with a single card don't use h2s.
  const cardIndexes = contents.flatMap((el, index) =>
    el.nodeName === "H2" ? [index] : []
  );

  const docs =
    cardIndexes.length === 0
      ? [doc]
      : cardIndexes.map((position, index, indexes) =>
          prepareDOM(
            contents
              .slice(position, indexes[index + 1])
              .map((_) => _.outerHTML)
              .join()
          )
        );

  const coreStats = docs.map((doc) => {
    const cardNameElement = doc.querySelector("h2[id] > span");
    const cardName = cardNameElement ? cardNameElement.innerText : undefined;

    const factionAndTypes =
      extractList(doc, "Unit_Faction_and_Type") ||
      extractList(doc, "Model_Faction_and_Type");
    const faction = factionAndTypes[0];
    const types = factionAndTypes.slice(1);
    const squadSize = extractText(doc, "Squad_Size");
    const deploymentCost = extractText(doc, "Deployment_Cost");
    const baseSize = extractText(doc, "Base_Size");
    const health = extractText(doc, "Health");
    const wildCardFactions = extractList(doc, "Wild_Card_Factions");
    const weaponPoints = extractText(doc, "Weapon_Points");
    const hardpoints = extractText(doc, "Hardpoints");
    const specialRules = extractDefinitions(doc, "Special_Rules");
    const chassisSpecialRules = extractDefinitions(
      doc,
      "Chassis_Special_Rules"
    );
    const chassisAdvantages = extractDefinitions(doc, "Chassis_Advantages");
    const advantages = extractDefinitions(doc, "Advantages");
    const maneuvers = extractDefinitions(doc, "Maneuvers");
    const vehicleWeaponSelection = extractWeaponSelection(
      doc,
      "Weapon_Selection"
    );
    const cortexes = extractCortexes(doc, "Cortexes");

    const modelStatsData = [
      ...doc
        .querySelector(
          "h3[id^=Unit_Stats] ~ table, h3[id^=Model_Stats] ~ table"
        )
        .querySelectorAll("tr > td"),
    ].map((_) => cleanText(_.innerText));
    const modelStatsLength = modelStatsData.length / 2;
    const modelStats = Object.fromEntries(
      Array.from({ length: modelStatsLength }, (_, i) => i).map((i) => [
        modelStatsData[i],
        modelStatsData[i + modelStatsLength],
      ])
    );

    let weaponsData = [
      ...doc.querySelectorAll("h3[id^=Weapons] ~ table tr"),
    ].map((tr) => [...tr.querySelectorAll("td")]);
    let weapons = undefined;
    if (weaponsData.length > 0) {
      weapons = [];
      let header = weaponsData[0].map((td) => td.innerText);
      let weaponsList = weaponsData.slice(1);
      for (const tds of weaponsList) {
        if (tds.length === header.length) {
          const stats = tds.map((td) => td.innerText);
          const weapon = Object.fromEntries(
            header.map((key, i) => [cleanText(key), cleanText(stats[i])])
          );
          weapons.push(weapon);
        }
        if (tds.length === 1) {
          const previousWeapons = weapons.slice(0, weapons.length - 1);
          const lastWeapon = weapons[weapons.length - 1];

          const weapon = {
            ...lastWeapon,
            specialRules: parseDefinitionText(tds[0]),
          };
          weapons = [...previousWeapons, weapon];
        }
      }
    }

    function weaponDetails() {
      const weaponDetailsTable = doc.querySelector("table.mw-collapsible");
      if (!weaponDetailsTable) return undefined;

      const weaponDetailsData = [...weaponDetailsTable.querySelectorAll("tr")]
        .map((tr) => [...tr.querySelectorAll("td, th")])
        .filter((_) => _.length === 4);
      if (!weaponDetailsData || weaponDetailsData.length === 0)
        return undefined;

      const detailsHeader = weaponDetailsData[0].map((_) =>
        cleanText(_.innerText)
      );
      return weaponDetailsData.slice(1).map((tds) =>
        Object.fromEntries(
          tds.map((td, i) => {
            const a = td.querySelector("a");
            const hrefs = a ? a.href.split("title=") : undefined;
            const text = cleanText(td.innerText);
            return [
              detailsHeader[i],
              a ? { text, page: hrefs[hrefs.length - 1] } : { text },
            ];
          })
        )
      );
    }

    return {
      ...(cardName ? { cardName } : {}),
      faction,
      types,
      squadSize,
      deploymentCost,
      baseSize,
      health,
      wildCardFactions,
      hardpoints,
      weaponPoints,
      modelStats,
      specialRules,
      weapons,
      advantages,
      maneuvers,
      vehicleWeaponSelection,
      cortexes,
      chassisSpecialRules,
      chassisAdvantages,
      weaponDetails: weaponDetails(),
    };
  });

  const model = {
    storeLinks,
    coreStats,
    release,
    lore,
  };

  return removeUndefinedValues(model);
};

export { parseModelText };

function extractStoreLinks(doc) {
  return [...doc.querySelectorAll("p")]
    .filter((p) =>
      [...p.querySelectorAll("a")].some((a) => a.href.includes("store"))
    )
    .map((p) => p.innerHTML.replace(/\n/g, ""))
    .flatMap((html) => html.split("<br>"));
}

function removeUndefinedValues(obj) {
  if (Array.isArray(obj)) return obj.map(removeUndefinedValues);
  if (typeof obj !== "object") return obj;

  return Object.fromEntries(
    Object.entries(obj)
      .filter(([key, value]) => typeof value !== "undefined")
      .map(([key, value]) => [key, removeUndefinedValues(value)])
  );
}

function extractText(doc, id, { node = "h3" } = {}) {
  const p = doc.querySelector(`${node}[id^=${id}] ~ p`);
  if (!p) return undefined;

  return cleanText(p.innerText);
}

function extractList(doc, id) {
  const p = doc.querySelector(`h3[id^=${id}] ~ p`);
  if (!p) return undefined;

  const as = [...p.querySelectorAll("a")];
  if (as.length === 0) return undefined;

  return as.map((a) => {
    const hrefs = a.href.split("title=");
    return { text: a.innerText, page: hrefs[hrefs.length - 1] };
  });
}

function extractWeaponSelection(doc, id) {
  const node = doc.querySelector(`h3[id^=${id}] + p`);
  if (!node) return undefined;

  const anchors = [...node.querySelectorAll("a")];

  return anchors.map((a) => parseAnchor(a));
}

function extractCortexes(doc, id) {
  function helper(node, cortexes) {
    switch (node.tagName) {
      case "P":
        const cortex = node.querySelector("b").innerText;
        const definitions = parseDefinitionText(node);
        return helper(node.nextSibling, [...cortexes, [cortex, definitions]]);
      case "H3":
        return cortexes;
      default:
        return helper(node.nextSibling, cortexes);
    }
  }

  const node = doc.querySelector(`h3[id^=${id}] ~ p`);
  if (!node) return undefined;

  return Object.fromEntries(helper(node, []));
}

function parseDefinitionText(node) {
  const uls = [...node.querySelectorAll("ul")];

  for (const ul of uls) {
    const list = [...ul.querySelectorAll("li")].map(
      (li) => " • " + li.innerText
    );
    ul.replaceWith(list.join(""));
  }

  const definitions = node.innerHTML
    .split("<br>")
    .map((_) => _.replace(/<[^>]+>/g, "").trim());

  const pairs = definitions.flatMap((definition) => {
    const separator = ": ";
    const groups = definition.split(separator).map(cleanText).map(encodeHTML);
    if (groups.length < 2) return [];
    const key = groups[0];
    const val = groups.slice(1).join(separator).replace(/\s•\s/g, "\n • ");
    return [[key, val]];
  });
  if (pairs.length === 0) return undefined;

  return Object.fromEntries(pairs);
}

function encodeHTML(text) {
  const parser = new DOMParser();
  const dom = parser.parseFromString(
    "<!doctype html><body>" + text,
    "text/html"
  );
  return dom.body.textContent;
}

function extractDefinitions(doc, id) {
  const ul = doc.querySelector(`h3[id^='${id}'] ~ p ~ ul`);
  const p = doc.querySelector(`h3[id^='${id}'] ~ p`);
  if (!p) return undefined;

  if (ul) p.append(ul);

  return parseDefinitionText(p);
}
