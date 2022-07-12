import { all, put } from "redux-saga/effects";
import { FetchWikiPage, RefreshWikiPages } from "../../messages";
import { cacheWikiPages } from "./cacheWikiPages";
import { parseWikiPages } from "./parseWikiPages";
import { triggerFetchWikiPages } from "./triggerFetchWikiPages";
import { ui } from "./ui";

function* processes() {
  yield all([
    cacheWikiPages(),
    parseWikiPages(),
    triggerFetchWikiPages(),
    ui(),
    fetchInitialData(),
    refresh(),
  ]);
}

export { processes };

function* fetchInitialData() {
  const pages = ["Warcaster", "Wild_Card", "Cypher_Codecs"];
  for (const page of pages) {
    yield put(FetchWikiPage({ page }));
  }
}

function* refresh() {
  yield put(RefreshWikiPages());
}
