import { StateShard } from "../utils";
import { put } from "redux-saga/effects";

const Requests = StateShard(
  "Requests",
  init,
  { cache, expire, fetch, fetched },
  {
    parsePage,
    queryCadreModels,
    queryCadres,
    queryRevisions,
    queryPageIds,
  },
  {
    selectCachedRequestsByPageIds,
    selectCachedParsedPageIds,
    selectCachedUrl,
    selectPending,
  }
);

export { Requests };

function init(state) {
  if (!state.io) {
    state.io = {};
  }

  state.io.requests = { cached: {}, pending: [] };
}

// Actions

function cache(state, { url, data, queryParams }) {
  const cached = selectCached(state);

  cached[url] = { data, queryParams };
}

function expire(state, { url }) {
  const cached = selectCached(state);

  delete cached[url];
}

function fetch(state, params) {
  const pending = selectPending(state);

  if (!pending.find((request) => request.url === params.url)) {
    pending.push(params);
  }
}

function fetched(state, { url }) {
  const pending = selectPending(state);

  const index = pending.findIndex((request) => request.url === url);
  if (index > -1) {
    pending.splice(index, 1);
  }
}

// Action Creators

function* parsePage({ page, parserName }) {
  const queryParams = { action: "parse", page };

  yield put(
    Requests.fetch({
      desc: "parsePage",
      parserName,
      queryParams,
      url: jsonApiRequest(queryParams),
    })
  );
}

function* queryCadreModels({ pageId }) {
  const queryParams = {
    action: "query",
    list: "categorymembers",
    cmpageid: pageId,
    cmtype: "page",
    cmlimit: "max",
  };

  yield put(
    Requests.fetch({
      desc: "queryCadreModels",
      queryParams,
      url: jsonApiRequest(queryParams),
    })
  );
}

function* queryCadres() {
  const queryParams = {
    action: "query",
    list: "categorymembers",
    cmtitle: "Category:Cadre",
    cmtype: "subcat",
    cmlimit: "max",
  };

  yield put(
    Requests.fetch({
      desc: "queryCadres",
      queryParams,
      url: jsonApiRequest(queryParams),
    })
  );
}

function* queryRevisions({ pageIds }) {
  const queryParams = {
    action: "query",
    prop: "revisions",
    pageids: pageIds.join("|"),
  };

  yield put(
    Requests.fetch({
      desc: "queryRevisions",
      queryParams,
      url: jsonApiRequest(queryParams),
    })
  );
}

function* queryPageIds({ pages }) {
  const queryParams = {
    action: "query",
    prop: "pageprops",
    titles: encodeURIComponent(pages.map((_) => _.text).join("|")),
  };

  yield put(
    Requests.fetch({
      desc: "queryPageIds",
      pages,
      queryParams,
      url: jsonApiRequest(queryParams),
    })
  );
}

// Selectors

function select(state) {
  return state.io.requests;
}

function selectCached(state) {
  const requests = select(state);
  return requests.cached;
}

function selectCachedUrl(state, url) {
  const cached = selectCached(state);
  return cached[url];
}

function selectCachedRequestsByPageIds(state, pageIds) {
  const cached = selectCached(state);
  return Object.fromEntries(
    Object.entries(cached).filter(
      ([key, { data }]) =>
        data && data.parse && pageIds.includes(data.parse.pageid)
    )
  );
}

function selectCachedParsedPageIds(state) {
  const cached = selectCached(state);
  return Object.values(cached)
    .filter(({ data }) => data && data.parse)
    .map(({ data }) => data.parse.pageid);
}

function selectPending(state) {
  const requests = select(state);
  return requests.pending;
}

// Utils

function jsonApiRequest(queryParams) {
  const jsonFormat = {
    formatversion: 2,
    format: "json",
  };
  const params = { ...queryParams, ...jsonFormat };

  const queryString = Object.entries(params)
    .map((keyValue) => keyValue.join("="))
    .join("&");

  return "https://privateerpress.wiki/api.php?" + queryString;
}
