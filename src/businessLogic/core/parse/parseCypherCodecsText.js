import { parseAnchorTable } from "./parsers";
import { prepareDOM } from "./utils";

const parseCypherCodecsText = (text) => {
  const doc = prepareDOM(text);

  return collectCypherCodecs(doc);
};

export { parseCypherCodecsText };

function collectCypherCodecs(doc) {
  const cypherCodecsTable = doc.querySelector("table.sortable");
  if (!cypherCodecsTable) return undefined;

  const cypherCodecs = parseAnchorTable(cypherCodecsTable);
  return cypherCodecs.map((cypherCodec) =>
    Object.fromEntries(
      Object.entries(cypherCodec).map(([key, values]) => [key, values[0]])
    )
  );
}
