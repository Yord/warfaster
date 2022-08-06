import { parseAnchorTable } from "./parsers";
import { prepareDOM } from "./utils";

const parseFactionModelsText = (text) => {
  const doc = prepareDOM(text);

  const table = doc.querySelector("h1#Models ~ table");
  const models = parseAnchorTable(table);

  return models.map((model) =>
    Object.fromEntries(
      Object.entries(model).map(([key, values]) => [key, values[0]])
    )
  );
};

export { parseFactionModelsText };
