import { put, take, select } from "redux-saga/effects";
import { FetchWikiPage, RemoveWikiPage } from "./actions";
import { wikiPage } from "../store/wikiPage";

const refreshOutdatedWikiPages = function* () {
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
};

export { refreshOutdatedWikiPages };
