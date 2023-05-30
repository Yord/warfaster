import { all, put } from "redux-saga/effects";
import { FetchWikiPage, RefreshWikiPages } from "../../messages";
import { Requests } from "../../state/io/Requests";
import { cacheWikiPages } from "./cacheWikiPages";
import { fetchCadres } from "./fetchCadres";
import { parseWikiPages } from "./parseWikiPages";
import { triggerFetchWikiPages } from "./triggerFetchWikiPages";
import { ui } from "./ui";

function* processes() {
  yield all([
    cacheWikiPages(),
    parseWikiPages(),
    triggerFetchWikiPages(),
    ui(),
    fetchCadres(), // TODO: do this in a common action channel with FetchWikiPage to avoid overloading the PP page
    fetchInitialData(),
    refresh(),
  ]);
}

export { processes };

function* fetchInitialData() {
  const pages = [
    ["Warcaster", "parseFactions"],
    ["Wild_Card", "parseWildCard"],
    ["Cypher_Codecs", "parseCypherCodecs"],
  ];
  for (const [page, parserName] of pages) {
    yield put(Requests.parsePage({ page, parserName }));
    yield put(FetchWikiPage({ page }));
  }
}

function* refresh() {
  yield put(RefreshWikiPages());
}
