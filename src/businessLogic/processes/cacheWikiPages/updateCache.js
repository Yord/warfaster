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

import { Requests } from "../../../state/io/Requests";
import { ParserNames } from "../../../state/ParserNames";

function* updateCache() {
  yield all([refreshWikiPages(), refreshOutdatedWikiPages()]);
}

export { updateCache };

function* refreshWikiPages() {
  yield take(RefreshWikiPages().type);
  const parsedPageIds = yield select(Requests.selectCachedParsedPageIds());

  const queryLength = 50;
  for (let i = 0; i < parsedPageIds.length; i += queryLength) {
    const pageIds = parsedPageIds.slice(i, i + queryLength);

    yield* Requests.queryRevisions({ pageIds });
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

    const requests = yield select(
      Requests.selectCachedRequestsByPageIds(pageIds)
    );

    for (const [url, { data, queryParams }] of Object.entries(requests)) {
      const { page } = queryParams;
      const { parse } = data;

      const revInfo = revInfoByPageId[parse.pageid];
      if (revInfo.missing) {
        yield put(Requests.expire({ url }));
      } else if (parse.revid < revInfo.revid) {
        yield put(Requests.expire({ url }));
        const parserName = yield select(ParserNames.selectByPage(page));

        yield* Requests.parsePage({ page, parserName });
      }
    }
  }
}
