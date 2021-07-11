const parseFactions = (text) => {
  const doc = new DOMParser().parseFromString(text, "text/html");
  doc.querySelectorAll("h2 > span[id]").forEach((node) => {
    node.parentNode.id = node.id;
  });

  const p = doc.querySelector("h2#Factions ~ p");
  return Object.fromEntries(helper(p, []));
};

export { parseFactions };

function helper(node, factions) {
  switch (node.tagName) {
    case "P":
      const a = node.querySelector("a");
      const faction = [a.innerText, a.href];
      return helper(node.nextSibling, [...factions, faction]);
    case "H2":
      return factions;
    default:
      return helper(node.nextSibling, factions);
  }
}
