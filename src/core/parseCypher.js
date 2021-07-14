const parseCypher = (text) => {
  const doc = new DOMParser().parseFromString(text, "text/html");
  doc.querySelectorAll("h2 > span[id]").forEach((node) => {
    node.parentNode.id = node.id;
  });

  const type = extractLink(doc, "Type");
  const pow = extractLink(doc, "Pow");
  const effect = extractLink(doc, "Effect");
  const faction = extractLink(doc, "Faction");
  const source = extractLink(doc, "Source");

  const cypher = {
    type,
    pow,
    effect,
    faction,
    source,
  };

  return removeUndefinedValues(cypher);
};

export { parseCypher };

function extractLink(doc, id) {
  const p = doc.querySelector(`h2#${id} ~ p`);
  if (!p) return undefined;

  const a = p.querySelector("a");
  if (!a) return { text: p.innerText };

  const hrefs = a.href.split("title=");
  return { text: a.innerText, page: hrefs[hrefs.length - 1] };
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
