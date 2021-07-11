import { put, take } from "redux-saga/effects";

const parseFactions = function* () {
  while (true) {
    const { payload } = yield take("WIKI_PAGE/ADD");
    const { data, page } = payload;

    if (page === "Warcaster") {
      const factions = parse(data.text);
      yield put({ type: "FACTIONS/SET", payload: { factions } });
    }
  }
};

export { parseFactions };

function parse(text) {
  const doc = new DOMParser().parseFromString(text, "text/html");
  doc.querySelectorAll("h2 > span[id]").forEach((node) => {
    node.parentNode.id = node.id;
  });

  const p = doc.querySelector("h2#Factions ~ p");
  return Object.fromEntries(helper(p, []));

  function helper(node, factions) {
    switch (node.tagName) {
      case "P":
        const a = node.querySelector("a");
        const faction = [a.innerText, a.href];
        return helper(node.nextSibling, [...factions, faction]);
      case "H2":
        return factions;
      default:
        return helper(node.nextSibling, factions);
    }
  }
}
