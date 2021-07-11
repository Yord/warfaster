import { unixMillisNow } from "../utils";

const root = (state, action) => {
  switch (action.type) {
    case "WIKI_PAGE/SET":
      return {
        ...state,
        pages: {
          ...state.pages,
          [action.payload.page]: {
            ...action.payload.data,
            lastVisit: unixMillisNow(),
          },
        },
      };
    case "FACTIONS/SET":
      return {
        ...state,
        factions: action.payload.factions,
      };
    default:
      return state;
  }
};

export { root };
