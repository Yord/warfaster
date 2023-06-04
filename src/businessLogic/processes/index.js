import { all, put, select } from "redux-saga/effects";
import { RefreshWikiPages } from "../../messages";
import { Requests } from "../../state/io/Requests";
import { cacheParserNames } from "./cacheParserNames";
import { cacheWikiPages } from "./cacheWikiPages";
import { fetchCadres } from "./fetchCadres";
import { parseWikiPages } from "./parseWikiPages";
import { triggerFetchWikiPages } from "./triggerFetchWikiPages";
import { ui } from "./ui";

function* processes() {
  yield all([
    continuePending(),
    cacheWikiPages(),
    parseWikiPages(),
    triggerFetchWikiPages(),
    cacheParserNames(),
    ui(),
    fetchCadres(),
    fetchInitialData(),
    refresh(),
  ]);
}

export { processes };

function* fetchInitialData() {
  const pages = [
    { page: "Warcaster", parserName: "parseFactions" },
    { page: "Wild_Card", parserName: "parseWildCard" },
    { page: "Cypher_Codecs", parserName: "parseCypherCodecs" },
  ];
  for (const page of pages) {
    yield* Requests.parsePage(page);
  }
}

function* continuePending() {
  const pending = yield select(Requests.selectPending());
  for (const params of pending) {
    yield put(Requests.fetch(params));
  }
}

function* refresh() {
  yield put(RefreshWikiPages());
}
