const parseFactionModels = (text) => {
  const doc = new DOMParser().parseFromString(text, "text/html");
  doc.querySelectorAll("h1 > span[id]").forEach((node) => {
    node.parentNode.id = node.id;
  });

  const table = doc.querySelector("h1#Models ~ table");
  const header = [...table.querySelectorAll("th")].map((th) =>
    th.innerText.replace(/\n/g, "")
  );

  const body = [...table.querySelectorAll("tr")].map((tr) =>
    [...tr.querySelectorAll("td")].map((td) => {
      const a = td.querySelector("a");
      if (a) {
        const hrefTitle = a.href.split("title=");
        return { [a.innerText]: hrefTitle[hrefTitle.length - 1] };
      }
      return undefined;
    })
  );

  const models = body
    .filter((model) => model.length === header.length)
    .map((model) =>
      Object.fromEntries(
        header.flatMap((title, i) => (model[i] ? [[title, model[i]]] : []))
      )
    );

  return models;
};

export { parseFactionModels };
