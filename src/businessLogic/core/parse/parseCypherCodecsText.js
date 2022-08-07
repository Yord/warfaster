import { parseAnchorTable } from "./parsers";
import { prepareDOM } from "./utils";

const parseCypherCodecsText = (text) => {
  const doc = prepareDOM(text);

  const cypherCodecsTable = doc.querySelector("table.sortable");
  if (!cypherCodecsTable) {
    console.error("parseCypherCodecsText: cypherCodecsTable not found!");
    return undefined;
  }

  const cypherCodecs = parseAnchorTable(cypherCodecsTable);
  return cypherCodecs.map((cypherCodec) =>
    Object.fromEntries(
      Object.entries(cypherCodec).map(([key, values]) => [key, values[0]])
    )
  );
};

export { parseCypherCodecsText };
