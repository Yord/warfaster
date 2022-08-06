import { prepareDOM } from "./utils";

const parseFactionsText = (text) => {
  const doc = prepareDOM(text);

  const p = doc.querySelector("h2#Factions ~ p");
  const factions = Object.fromEntries(collectFactions(p, []));
  delete factions.Wild_Card;
  return factions;
};

export { parseFactionsText };

function collectFactions(node, factions) {
  switch (node.tagName) {
    case "P":
      const a = node.querySelector("a");
      const hrefTitle = a.href.split("title=");
      const page = hrefTitle[hrefTitle.length - 1];
      const text = a.innerText;
      const faction = [page, { text, page }];
      return collectFactions(node.nextSibling, [...factions, faction]);
    case "H2":
      return factions;
    default:
      return collectFactions(node.nextSibling, factions);
  }
}
