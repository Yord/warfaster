/*
These sagas fetch and cache wiki pages.

The wiki's JSONP API is used to fetch page contents. Since we want to be
polite, we only call the API every two seconds. This throttle is implemented in
fetchWikiPage through an actionChannel and a call to delay.
*/

import {
  actionChannel,
  all,
  call,
  delay,
  put,
  select,
  take,
} from "redux-saga/effects";
import { FetchedWikiPage } from "../../../messages";
import { jsonp } from "../jsonp";

import { WikiPages } from "../../../state/WikiPages";

function* cacheWikiPages() {
  yield all([addWikiPage(), fetchWikiPage()]);
}

export { cacheWikiPages };

function* fetchWikiPage() {
  const wikiPageChannel = yield actionChannel("WIKI_PAGE/FETCH");

  while (true) {
    const { payload } = yield take(wikiPageChannel);
    const page = payload.page;
    const data = yield select(WikiPages.selectPageByPage(page));

    if (!data) {
      const data = yield call(jsonp, parsePage(page));
      yield put(FetchedWikiPage({ page, data: data.parse }));

      const twoSecondsInMs = 2 * 1000;
      yield delay(twoSecondsInMs);
    }
  }
}

function* addWikiPage() {
  while (true) {
    const { payload } = yield take("WIKI_PAGE/FETCHED");
    const page = payload.page;
    const data = payload.data;

    yield put(WikiPages.addPage({ page, data }));
  }
}

function parsePage(page) {
  return `https://privateerpress.wiki/api.php?action=parse&page=${page}&formatversion=2&format=json`;
}
