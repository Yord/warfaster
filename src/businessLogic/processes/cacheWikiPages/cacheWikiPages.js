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
import { FetchedWikiPage, FetchedWikiPageRevisions } from "../../../messages";
import { jsonp } from "../jsonp";

import { WikiPages } from "../../../state/WikiPages";
import { Requests } from "../../../state/io/Requests";
import { CadreCategoryMembers } from "../../../state/CadreCategoryMembers";
import { CadreModels } from "../../../state/CadreModels";
import { PageIds } from "../../../state/PageIds";

function* cacheWikiPages() {
  yield all([addWikiPage(), fetchWikiPage()]);
}

export { cacheWikiPages };

function* fetchWikiPage() {
  const wikiPageChannel = yield actionChannel(Requests.fetch().type);

  while (true) {
    const action = yield take(wikiPageChannel);
    const { payload } = action;
    const { desc, parserName, queryParams } = payload;

    if (desc === "queryRevisions") {
      const data = yield call(jsonp, jsonApiRequest(queryParams));
      yield put(
        FetchedWikiPageRevisions({
          pageRevisions: data.query.pages,
        })
      );
    }

    if (desc === "queryCadres") {
      const data = yield select(CadreCategoryMembers.select());
      if (Object.keys(data).length === 0) {
        const data = yield call(jsonp, jsonApiRequest(queryParams));
        if (data.batchcomplete && data.query) {
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
      }
    }

    if (desc === "queryCadreModels") {
      const {
        queryParams: { cmpageid: cadrePageId },
      } = payload;

      const cadreModels = yield select(
        CadreModels.selectCadreModelsByPageId(cadrePageId)
      );

      if (!cadreModels) {
        const { batchcomplete, query } = yield call(
          jsonp,
          jsonApiRequest(queryParams)
        );
        if (batchcomplete && query) {
          const categoryMembers = query.categorymembers;
          if (categoryMembers) {
            const cadreModels = categoryMembers.map(({ pageid, title }) => ({
              pageId: pageid,
              title,
            }));

            yield put(
              CadreModels.setByCadrePageId({ cadrePageId, cadreModels })
            );
          }
        }
      }
    }

    if (desc === "parsePage") {
      const { page } = queryParams;

      if (!page) {
        console.error("No page to fetch!", action);
        continue;
      }

      const cached = yield select(WikiPages.selectPageByPage(page));

      if (cached) {
        yield put(FetchedWikiPage({ page, data: cached, parserName }));
        continue;
      }

      const data = yield call(jsonp, jsonApiRequest(queryParams));

      yield put(FetchedWikiPage({ page, data: data.parse, parserName }));
    }

    if (desc === "queryPageIds") {
      const { pages } = payload;

      const data = yield call(jsonp, jsonApiRequest(queryParams));

      const titleToPageId = Object.fromEntries(
        data.query.pages.map(({ title, pageid }) => [title, pageid])
      );

      const pageIdByTitle = Object.fromEntries(
        pages.map(({ text, page }) => [page.split("#")[0], titleToPageId[text]])
      );

      yield put(PageIds.addPages({ pageIdByTitle }));
    }

    const twoSecondsInMs = 2 * 1000;
    yield delay(twoSecondsInMs);
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

function jsonApiRequest(queryParams) {
  const jsonFormat = {
    formatversion: 2,
    format: "json",
  };
  const params = { ...queryParams, ...jsonFormat };

  const queryString = Object.entries(params)
    .map((keyValue) => keyValue.join("="))
    .join("&");

  return "https://privateerpress.wiki/api.php?" + queryString;
}
