import { actionChannel, call, delay, put, take } from "redux-saga/effects";
import { jsonp } from "../core/jsonp";
import { FetchedWikiPageRevisions } from "./actions";

const fetchWikiPageRevisions = function* () {
  const revisionsChannel = yield actionChannel("WIKI_PAGE_REVISIONS/FETCH");

  while (true) {
    const { payload } = yield take(revisionsChannel);
    const pageids = payload.pageids;

    const data = yield call(jsonp, revisionsQuery(pageids));
    yield put(
      FetchedWikiPageRevisions({
        pageRevisions: data.query.pages,
      })
    );

    const twoSecondsInMs = 2 * 1000;
    yield delay(twoSecondsInMs);
  }
};

export { fetchWikiPageRevisions };

function revisionsQuery(pageids) {
  return `https://privateerpress.wiki/api.php?action=query&pageids=${pageids}&prop=revisions&formatversion=2&format=json`;
}
