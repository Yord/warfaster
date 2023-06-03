/*
These sagas make sure, cached wiki pages stay up-to-date.

Each app reload triggers a RefreshWikiPages action, that starts the cache
update process. The refreshWikiPages saga bulk loads revision data for all
cached pages from the wiki API. If a page cannot be found (probably because it
was deleted from the wiki), it is removed from the cache. If revision
information is found, it is compared with the cached revision of the page. If
the loaded revision is higher, the page is removed and fetched again. If the
cached revision is higher or equal, the page is not refreshed and remains
cached.
*/

import { FetchedWikiPageRevisions, RefreshWikiPages } from "../../../messages";
import { all, put, take, select } from "redux-saga/effects";

import { WikiPages } from "../../../state/WikiPages";
import { Requests } from "../../../state/io/Requests";
import { ParserNames } from "../../../state/ParserNames";

function* updateCache() {
  yield all([refreshWikiPages(), refreshOutdatedWikiPages()]);
}

export { updateCache };

function* refreshWikiPages() {
  yield take(RefreshWikiPages().type);
  const pageIds = yield select(WikiPages.selectPageIds());

  const queryLength = 50;
  for (let i = 0; i < pageIds.length; i += queryLength) {
    yield* Requests.queryRevisions({
      pageIds: pageIds.slice(i, i + queryLength),
    });
  }
}

function* refreshOutdatedWikiPages() {
  while (true) {
    const { payload } = yield take(FetchedWikiPageRevisions().type);
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

    const pages = yield select(WikiPages.selectPagesByPageIds(pageIds));
    for (const page of pages) {
      const revInfo = revInfoByPageId[page.pageid];
      if (revInfo.missing) {
        yield put(WikiPages.removePage({ page: page.page }));
      } else if (page.revid < revInfo.revid) {
        yield put(WikiPages.removePage({ page: page.page }));
        const parserName = yield select(ParserNames.selectByPage(page.page));
        yield* Requests.parsePage({
          page: page.page,
          parserName, // TODO: Test if this works
        });
      }
    }
  }
}
