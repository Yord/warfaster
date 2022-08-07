import { parseAnchor } from "./parsers";
import { prepareDOM } from "./utils";

const parseFactionsText = (text) => {
  const doc = prepareDOM(text);

  const p = doc.querySelector("h2#Factions ~ p");
  const factions = Object.fromEntries(collectFactions(p, []));
  delete factions.Wild_Card; // Wild Cards are crawled independently.
  return factions;
};

export { parseFactionsText };

function collectFactions(node, factions) {
  switch (node.tagName) {
    case "P":
      const a = node.querySelector("a");
      if (!a) {
        console.error("collectFactions: a not found!");
        return collectFactions(node.nextSibling, factions);
      }
      const anchor = parseAnchor(a);
      const faction = [anchor.page, anchor];
      return collectFactions(node.nextSibling, [...factions, faction]);
    case "H2":
      return factions;
    default:
      return collectFactions(node.nextSibling, factions);
  }
}
