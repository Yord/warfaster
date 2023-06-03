import { StateShard } from "../utils";
import { put } from "redux-saga/effects";

const Requests = StateShard(
  "Requests",
  init,
  { fetch },
  {
    parsePage,
    queryCadreModels,
    queryCadres,
    queryRevisions,
    queryPageIds,
  },
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

function fetch(state, { parserName, queryParams }) {
  select(state).push({ parserName, queryParams });
}

// Action Creators

function* parsePage({ page, parserName }) {
  yield put(
    Requests.fetch({
      desc: "parsePage",
      parserName,
      queryParams: {
        action: "parse",
        page,
      },
    })
  );
}

function* queryCadreModels({ pageId }) {
  yield put(
    Requests.fetch({
      desc: "queryCadreModels",
      queryParams: {
        action: "query",
        list: "categorymembers",
        cmpageid: pageId,
        cmtype: "page",
        cmlimit: "max",
      },
    })
  );
}

function* queryCadres() {
  yield put(
    Requests.fetch({
      desc: "queryCadres",
      queryParams: {
        action: "query",
        list: "categorymembers",
        cmtitle: "Category:Cadre",
        cmtype: "subcat",
        cmlimit: "max",
      },
    })
  );
}

function* queryRevisions({ pageIds }) {
  yield put(
    Requests.fetch({
      desc: "queryRevisions",
      queryParams: {
        action: "query",
        prop: "revisions",
        pageids: pageIds.join("|"),
      },
    })
  );
}

function* queryPageIds({ pages }) {
  yield put(
    Requests.fetch({
      desc: "queryPageIds",
      pages,
      queryParams: {
        action: "query",
        prop: "pageprops",
        titles: encodeURIComponent(pages.map((_) => _.text).join("|")),
      },
    })
  );
}

// Selectors

function select(state) {
  return state.io.requests;
}
