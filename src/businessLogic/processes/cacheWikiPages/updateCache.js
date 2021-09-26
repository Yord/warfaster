/*
These sagas make sure, cached wiki pages stay up-to-date.

Each app reload triggers a "WIKI_PAGES/REFRESH" action, that starts the cache
update process. The refreshWikiPages saga bulk loads revision data for all
cached pages from the wiki API. If a page cannot be found (probably because it
was deleted from the wiki), it is removed from the cache. If revision
information is found, it is compared with the cached revision of the page. If
the loaded revision is higher, the page is removed and fetched again. If the
cached revision is higher or equal, the page is not refreshed and remains
cached.
*/

import { wikiPage } from "../../../state/dataAccess";
import {
  FetchWikiPage,
  FetchWikiPageRevisions,
  FetchedWikiPageRevisions,
  RemoveWikiPage,
} from "../../../messages";
import {
  actionChannel,
  all,
  call,
  delay,
  put,
  take,
  select,
} from "redux-saga/effects";
import { jsonp } from "../jsonp";

function* updateCache() {
  yield all([
    refreshWikiPages(),
    fetchWikiPageRevisions(),
    refreshOutdatedWikiPages(),
  ]);
}

export { updateCache };

function* refreshWikiPages() {
  yield take("WIKI_PAGES/REFRESH");
  const pageIds = yield select(wikiPage.selectPageIds);

  const queryLength = 50;
  const pageidsList = [];
  for (let i = 0; i < pageIds.length; i += queryLength) {
    const ids = pageIds.slice(i, i + queryLength);
    const pageids = ids.join("|");
    pageidsList.push(pageids);
  }

  for (const pageids of pageidsList) {
    yield put(FetchWikiPageRevisions({ pageids }));
  }
}

function* fetchWikiPageRevisions() {
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
}

function* refreshOutdatedWikiPages() {
  while (true) {
    const { payload } = yield take("WIKI_PAGE_REVISIONS/FETCHED");
    const { pageRevisions } = payload;
    const revInfoByPageId = Object.fromEntries(
      pageRevisions.map((revision) => [
        revision.pageid,
        revision.missing
          ? { missing: revision.missing }
          : {
              revid: Math.max(
                ...revision.revisions.map((revision) => revision.revid)
              ),
            },
      ])
    );
    const pageIds = pageRevisions.map((revision) => revision.pageid);

    const pages = yield select(wikiPage.selectGivenPageIds(pageIds));
    for (const page of pages) {
      const revInfo = revInfoByPageId[page.pageid];
      if (revInfo.missing) {
        yield put(RemoveWikiPage({ page: page.page }));
      } else if (page.revid < revInfo.revid) {
        yield put(RemoveWikiPage({ page: page.page }));
        yield put(FetchWikiPage({ page: page.page, type: page.type }));
      }
    }
  }
}

function revisionsQuery(pageids) {
  return `https://privateerpress.wiki/api.php?action=query&pageids=${pageids}&prop=revisions&formatversion=2&format=json`;
}
