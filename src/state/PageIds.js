import { StateShard } from "./utils";

const PageIds = StateShard(
  "PageIds",
  init,
  { addPages },
  { select, selectByPage, selectByPages, selectPageByPageId }
);

export { PageIds };

function init(state) {
  if (!state.data) {
    state.data = {};
  }

  state.data.pageIds = {};
}

// Actions

function addPages(state, { pageIdByTitle }) {
  const pageIds = select(state);
  for (const title in pageIdByTitle) {
    pageIds[title] = pageIdByTitle[title];
  }
}

// Selectors

function select(state) {
  return state.data.pageIds;
}

function selectByPage(state, page) {
  const pageIds = select(state);
  return pageIds[page];
}

function selectByPages(state, pages) {
  const pageIds = select(state);
  return pages.reduce((acc, page) => [...acc, pageIds[page]], []);
}

function selectPageByPageId(state, pageId) {
  const pageIds = select(state);
  return Object.entries(pageIds).reduce(
    (acc, [page, statePageId]) =>
      acc ? acc : statePageId === pageId ? page : acc,
    undefined
  );
}
