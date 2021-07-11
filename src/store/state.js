import produce from "immer";
import { wikiPage } from "./wikiPage";
import { factions } from "./factions";

const identity = (a) => a;

const immer = (f) => (state, action) => produce(f(action) || identity)(state);

const root = immer(({ type, payload }) => {
  switch (type) {
    case "WIKI_PAGE/ADD":
      return wikiPage.add(payload.page, payload.data);
    case "FACTIONS/SET":
      return factions.set(payload.factions);
  }
});

export { root };
