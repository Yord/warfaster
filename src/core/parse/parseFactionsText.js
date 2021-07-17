const parseFactionsText = (text) => {
  const doc = new DOMParser().parseFromString(text, "text/html");
  doc.querySelectorAll("h2 > span[id]").forEach((node) => {
    node.parentNode.id = node.id;
  });

  const p = doc.querySelector("h2#Factions ~ p");
  return Object.fromEntries(collectFactions(p, []));
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
