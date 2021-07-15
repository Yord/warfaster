import { put, take, select } from "redux-saga/effects";
import { wikiPage } from "../store/wikiPage";
import { FetchWikiPageRevisions } from "./actions";

const refreshWikiPages = function* () {
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
};

export { refreshWikiPages };
