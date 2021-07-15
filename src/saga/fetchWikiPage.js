import {
  actionChannel,
  call,
  delay,
  put,
  select,
  take,
} from "redux-saga/effects";
import { unixMillisNow } from "../core/time";
import { jsonp } from "../core/jsonp";
import { wikiPage } from "../store/wikiPage";
import { FetchedWikiPage } from "./actions";

const fetchWikiPage = function* () {
  const wikiPageChannel = yield actionChannel("WIKI_PAGE/FETCH");

  while (true) {
    const { payload } = yield take(wikiPageChannel);
    const page = payload.page;
    const type = payload.type;
    const data = yield select(wikiPage.select(page));

    const oneDayInMs = 24 * 60 * 60 * 1000;
    const twoSecondsInMs = 2 * 1000;
    if (!data || unixMillisNow() - data.lastVisit > oneDayInMs) {
      const data = yield call(jsonp, wiki(page));
      yield put(FetchedWikiPage({ page, data: data.parse, type }));
      yield delay(twoSecondsInMs);
    }
  }
};

export { fetchWikiPage };

function wiki(page) {
  return `https://privateerpress.wiki/api.php?action=parse&page=${page}&formatversion=2&format=json`;
}
