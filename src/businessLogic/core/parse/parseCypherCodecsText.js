const parseCypherCodecsText = (text) => {
  const doc = new DOMParser().parseFromString(text, "text/html");

  return collectCypherCodecs(doc);
};

export { parseCypherCodecsText };

function collectCypherCodecs(doc) {
  const cypherCodecsTable = doc.querySelector("table.sortable");
  if (!cypherCodecsTable) return undefined;

  const cypherCodecsData = [...cypherCodecsTable.querySelectorAll("tr")]
    .map((tr) => [...tr.querySelectorAll("td, th")])
    .filter((_) => _.length === 4);
  if (cypherCodecsData.length === 0) return undefined;

  const detailsHeader = cypherCodecsData[0].map((_) => cleanText(_.innerText));
  return cypherCodecsData.slice(1).map((tds) =>
    Object.fromEntries(
      tds.map((td, i) => {
        const a = td.querySelector("a");
        const hrefs = a ? a.href.split("title=") : undefined;
        const text = cleanText(td.innerText);
        return [
          detailsHeader[i],
          a ? { text, page: hrefs[hrefs.length - 1] } : { text },
        ];
      })
    )
  );
}

function cleanText(text) {
  return text.replace(/\n/g, "");
}
