/*
These sagas fetch and cache wiki pages.

The wiki's JSONP API is used to fetch page contents. Since we want to be
polite, we only call the API every two seconds. This throttle is implemented in
fetchWikiPage through an actionChannel and a call to delay.
*/

import {
  actionChannel,
  call,
  delay,
  put,
  select,
  take,
} from "redux-saga/effects";
import { FetchedWikiPage, FetchedWikiPageRevisions } from "../../../messages";
import { jsonp } from "../jsonp";

import { Requests } from "../../../state/io/Requests";
import { CadreCategoryMembers } from "../../../state/CadreCategoryMembers";
import { CadreModels } from "../../../state/CadreModels";
import { PageIds } from "../../../state/PageIds";

function* fetchWikiPage() {
  const wikiPageChannel = yield actionChannel(Requests.fetch().type);

  while (true) {
    const action = yield take(wikiPageChannel);
    const { payload } = action;
    const { desc, parserName, queryParams, url } = payload;

    let request = yield select(Requests.selectCachedUrl(url));
    let wait = false;
    if (!request) {
      const data = yield call(jsonp, url);
      request = { data, queryParams };
      wait = true;
      yield put(Requests.cache({ url, data, queryParams }));
    }
    yield put(Requests.fetched({ url }));

    const data = request.data;

    if (desc === "queryRevisions") {
      const pageRevisions = data.query.pages;

      yield put(FetchedWikiPageRevisions({ pageRevisions }));
    }

    if (desc === "queryCadres") {
      const categorymembers = data.query.categorymembers;
      if (categorymembers) {
        const cadreCategoryMembers = Object.fromEntries(
          categorymembers.map((member) => [
            member.pageid,
            member.title.replace(/^Category:/, ""),
          ])
        );

        yield put(CadreCategoryMembers.set({ cadreCategoryMembers }));
      }
    }

    if (desc === "queryCadreModels") {
      const { cmpageid: cadrePageId } = queryParams;

      const categoryMembers = data.query.categorymembers;
      if (categoryMembers) {
        const cadreModels = categoryMembers.map(({ pageid, title }) => ({
          pageId: pageid,
          title,
        }));

        yield put(CadreModels.setForCadrePageId({ cadrePageId, cadreModels }));
      }
    }

    if (desc === "parsePage") {
      const { page } = queryParams;

      if (!page) {
        console.error("No page to fetch!", action);
        continue;
      }

      yield put(FetchedWikiPage({ page, data: data.parse, parserName }));
    }

    if (desc === "queryPageIds") {
      const { pages } = payload;

      const titleToPageId = Object.fromEntries(
        data.query.pages.map(({ title, pageid }) => [title, pageid])
      );

      const pageIdByTitle = Object.fromEntries(
        pages.map(({ text, page }) => [page.split("#")[0], titleToPageId[text]])
      );

      yield put(PageIds.addPages({ pageIdByTitle }));
    }

    if (wait) {
      const twoSecondsInMs = 2 * 1000;
      yield delay(twoSecondsInMs);
    }
  }
}

export { fetchWikiPage };
