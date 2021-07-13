const parseFactions = (text) => {
  const doc = new DOMParser().parseFromString(text, "text/html");
  doc.querySelectorAll("h2 > span[id]").forEach((node) => {
    node.parentNode.id = node.id;
  });

  const p = doc.querySelector("h2#Factions ~ p");
  return Object.fromEntries(collectFactions(p, []));
};

export { parseFactions };

function collectFactions(node, factions) {
  switch (node.tagName) {
    case "P":
      const a = node.querySelector("a");
      const hrefTitle = a.href.split("title=");
      const faction = [a.innerText, hrefTitle[hrefTitle.length - 1]];
      return collectFactions(node.nextSibling, [...factions, faction]);
    case "H2":
      return factions;
    default:
      return collectFactions(node.nextSibling, factions);
  }
}
