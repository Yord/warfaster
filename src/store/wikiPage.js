import { unixMillisNow } from "../utils";

const wikiPage = {
  add: (page, data) => (state) => {
    state.pages[page] = {
      ...data,
      lastVisit: unixMillisNow(),
    };
  },
  get: (page) => (state) => state.pages[page],
};

export { wikiPage };
