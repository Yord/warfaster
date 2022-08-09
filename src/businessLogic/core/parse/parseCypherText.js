import { prepareDOM } from "./utils";

const parseCypherText = (text) => {
  const doc = prepareDOM(text);

  const type = extractLink(doc, "Type");
  const pow = extractLink(doc, "Pow");
  const effect = extractParagraphs(doc, "Effect");
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

export { parseCypherText };

function extractLink(doc, id) {
  const p = doc.querySelector(`h2#${id} ~ p`);
  if (!p) return undefined;

  const a = p.querySelector("a");
  if (!a) return { text: p.innerText };

  const hrefs = a.href.split("title=");
  return { text: a.innerText, page: hrefs[hrefs.length - 1] };
}

function extractParagraphs(doc, id) {
  function helper(node, texts) {
    switch (node.tagName) {
      case "P":
        return helper(node.nextSibling, [...texts, node.innerText.trim()]);
      case "H2":
        return texts;
      default:
        return helper(node.nextSibling, texts);
    }
  }

  const node = doc.querySelector(`h2#${id} ~ p`);
  if (!node) return undefined;

  return helper(node, []);
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
