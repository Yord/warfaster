function cleanText(text) {
  return text.replace(/\n/g, "");
}

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

export { cleanText, prepareDOM };
