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

export { parseAnchorTable, parseFactionModelsText };

function parseAnchor(a) {
  const titleColon = a.title.split(":");
  const hrefTitle = a.href.split("title=");
  return {
    text: titleColon[titleColon.length - 1],
    page: hrefTitle[hrefTitle.length - 1],
  };
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
