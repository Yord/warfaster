import { cleanText } from "./utils";

function parseAnchorTable(table) {
  const header = [...table.querySelectorAll("th")].map((th) =>
    cleanText(th.innerText)
  );

  const body = [...table.querySelectorAll("tr")].map((tr) =>
    [...tr.querySelectorAll("td")].map((td) => {
      const anchors = [...td.querySelectorAll("a")].map(parseAnchor);
      if (anchors.length > 0) {
        return anchors;
      }
      const text = parseText(td);
      if (text) {
        return [{ text }];
      }
      return [];
    })
  );

  return body
    .filter((row) => row.length === header.length)
    .map((row) =>
      Object.fromEntries(
        header.flatMap((title, i) => (row[i] ? [[title, row[i]]] : []))
      )
    );
}

function parseAnchor(a) {
  const titleColon = a.title.split(":");
  const hrefTitle = a.href.split("title=");
  return {
    text: titleColon[titleColon.length - 1],
    page: hrefTitle[hrefTitle.length - 1],
  };
}

export { parseAnchor, parseAnchorTable };

function parseText(node) {
  return cleanText(node.innerText);
}
