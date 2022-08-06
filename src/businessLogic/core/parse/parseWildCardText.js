import { parseAnchorTable } from "./parsers";
import { prepareDOM } from "./utils";

const parseWildCardText = (text) => {
  const doc = prepareDOM(text);

  const h1OrTable = doc.querySelectorAll("h1, table.sortable");
  const factionAndModels = [];

  for (let i = 0; i < h1OrTable.length; i++) {
    if (i % 2 === 0) {
      const h1 = h1OrTable[i];
      factionAndModels.push({ faction: h1.id });
    } else {
      const table = h1OrTable[i];
      const last = factionAndModels[factionAndModels.length - 1];
      const models = parseAnchorTable(table);
      last.models = models.map((model) =>
        Object.fromEntries(
          Object.entries(model).map(([key, values]) => [key, values[0]])
        )
      );
    }
  }

  return factionAndModels;
};

export { parseWildCardText };
