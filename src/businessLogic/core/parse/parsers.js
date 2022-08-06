function prepareDOM(text) {
  const doc = new DOMParser().parseFromString(text, "text/html");
  doc
    .querySelectorAll(
      "h1 > span[id], h2 > span[id], h3 > span[id], h4 > span[id]"
    )
    .forEach((node) => {
      node.parentNode.id = node.id;
    });

  return doc;
}

function parseAnchorTable(table) {
  const header = [...table.querySelectorAll("th")].map((th) =>
    th.innerText.replace(/\n/g, "")
  );

  const body = [...table.querySelectorAll("tr")].map((tr) =>
    [...tr.querySelectorAll("td")].map((td) =>
      [...td.querySelectorAll("a")].map(parseAnchor)
    )
  );

  return body
    .filter((row) => row.length === header.length)
    .map((row) =>
      Object.fromEntries(
        header.flatMap((title, i) => (row[i] ? [[title, row[i]]] : []))
      )
    );
}

export { parseAnchorTable, prepareDOM };

function parseAnchor(a) {
  const titleColon = a.title.split(":");
  const hrefTitle = a.href.split("title=");
  return {
    text: titleColon[titleColon.length - 1],
    page: hrefTitle[hrefTitle.length - 1],
  };
}
