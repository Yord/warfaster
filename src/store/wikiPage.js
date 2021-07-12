import { unixMillisNow } from "../core/time";

const wikiPage = {
  add: (page, data) => (state) => {
    state.pages[page] = {
      ...data,
      lastVisit: unixMillisNow(),
    };
  },
  select: (page) => (state) => state.pages[page],
};

export { wikiPage };
