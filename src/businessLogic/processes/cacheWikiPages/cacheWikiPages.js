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
import { FetchedWikiPage, FetchWikiPage } from "../../../messages";
import { jsonp } from "../jsonp";

import { WikiPages } from "../../../state/WikiPages";

function* cacheWikiPages() {
  yield all([addWikiPage(), fetchWikiPage()]);
}

export { cacheWikiPages };

function* fetchWikiPage() {
  const wikiPageChannel = yield actionChannel(FetchWikiPage().type);

  while (true) {
    const { payload } = yield take(wikiPageChannel);
    const page = payload.page;

    const cached = yield select(WikiPages.selectPageByPage(page));

    if (cached) {
      yield put(FetchedWikiPage({ page, data: cached }));
    } else {
      const data = yield call(jsonp, parsePage(page));

      yield put(FetchedWikiPage({ page, data: data.parse }));

      const twoSecondsInMs = 2 * 1000;
      yield delay(twoSecondsInMs);
    }
  }
}

function* addWikiPage() {
  while (true) {
    const { payload } = yield take(FetchedWikiPage().type);
    const page = payload.page;
    const data = payload.data;

    if (data) {
      yield put(WikiPages.addPage({ page, data }));
    }
  }
}

function parsePage(page) {
  return `https://privateerpress.wiki/api.php?action=parse&page=${page}&formatversion=2&format=json`;
}
