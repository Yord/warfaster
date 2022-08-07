import { parseAnchorTable } from "./parsers";
import { prepareDOM } from "./utils";

const parseFactionModelsText = (text) => {
  const doc = prepareDOM(text);

  const table = doc.querySelector("h1#Models ~ table");
  if (!table) {
    console.error("parseFactionModelsText: table not found!");
    return undefined;
  }
  const models = parseAnchorTable(table);

  return models.map((model) =>
    Object.fromEntries(
      Object.entries(model).flatMap(([key, values]) =>
        key === "Subtype"
          ? values.length > 0
            ? [[key, values]]
            : []
          : [[key, values[0]]]
      )
    )
  );
};

export { parseFactionModelsText };
