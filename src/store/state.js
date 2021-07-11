import { unixMillisNow } from "../utils";
import produce from "immer";

const identity = (a) => a;

const immer = (f) => (state, action) => produce(f(action) || identity)(state);

const root = immer((action) => {
  switch (action.type) {
    case "WIKI_PAGE/SET":
      return (state) => {
        state.pages[action.payload.page] = {
          ...action.payload.data,
          lastVisit: unixMillisNow(),
        };
      };
    case "FACTIONS/SET":
      return (state) => {
        state.factions = action.payload.factions;
      };
  }
});

export { root };
