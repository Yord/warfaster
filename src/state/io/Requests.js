import { StateShard } from "../utils";

const Requests = StateShard(
  "Requests",
  init,
  { parsePage, queryCadreModels, queryCadres, queryRevisions, queryPageIds },
  { select }
);

export { Requests };

function init(state) {
  if (!state.io) {
    state.io = {};
  }

  state.io.requests = [];
}

// Actions

function parsePage(state, { page, parserName }) {
  select(state).push({
    queryParams: {
      action: "parse",
      page,
    },
    parserName,
  });
}

function queryCadreModels(state, { pageId, parserName }) {
  select(state).push({
    queryParams: {
      action: "query",
      list: "categorymembers",
      cmpageid: pageId,
      cmtype: "page",
      cmlimit: "max",
    },
    parserName,
  });
}

function queryCadres(state, { parserName }) {
  select(state).push({
    queryParams: {
      action: "query",
      list: "categorymembers",
      cmtitle: "Category:Cadre",
      cmtype: "subcat",
      cmlimit: "max",
    },
    parserName,
  });
}

function queryRevisions(state, { pageIds, parserName }) {
  select(state).push({
    queryParams: {
      action: "query",
      prop: "revisions",
      pageids: pageIds, // TODO: encodeURIComponent(pageIds.join("|"))
    },
    parserName,
  });
}

function queryPageIds(state, { pages, parserName }) {
  select(state).push({
    queryParams: {
      action: "query",
      prop: "pageprops",
      titles: encodeURIComponent(pages.join("|")),
    },
    parserName,
  });
}

// Selectors

function select(state) {
  return state.io.requests;
}
