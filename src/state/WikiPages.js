import { StateShard } from "./utils";

const WikiPages = StateShard(
  "WikiPages",
  init,
  { addPage, removePage },
  { selectPageByPage, selectPagesByPageIds, selectPageIds }
);

export { WikiPages };

function init(state) {
  if (!state.data) {
    state.data = {};
  }

  state.data.pages = {};
}

// Actions

function addPage(state, { page, type, data }) {
  const pages = select(state);
  data.page = page;
  data.type = type;
  pages[page] = data;
}

function removePage(state, { page }) {
  const pages = select(state);
  delete pages[page];
}

// Selectors

function select(state) {
  return state.data.pages;
}

function selectPageByPage(state, page) {
  const pages = select(state);
  return pages[page];
}

function selectPagesByPageIds(state, pageIds) {
  const pages = select(state);
  return Object.values(pages).filter((page) => pageIds.includes(page.pageid));
}

function selectPageIds(state) {
  const pages = select(state);
  return Object.values(pages).map((page) => page.pageid);
}
