import { parseAnchorTable } from "./parsers";

const parseFactionModelsText = (text) => {
  const doc = new DOMParser().parseFromString(text, "text/html");
  doc.querySelectorAll("h1 > span[id]").forEach((node) => {
    node.parentNode.id = node.id;
  });

  const table = doc.querySelector("h1#Models ~ table");
  const models = parseAnchorTable(table);

  return models.map((model) =>
    Object.fromEntries(
      Object.entries(model).map(([key, values]) => [key, values[0]])
    )
  );
};

export { parseFactionModelsText };
