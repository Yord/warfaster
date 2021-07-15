import { put, take } from "redux-saga/effects";
import { AddWikiPage } from "./actions";

const addWikiPage = function* () {
  while (true) {
    const { payload } = yield take("WIKI_PAGE/FETCHED");
    const page = payload.page;
    const type = payload.type;
    const data = payload.data;

    yield put(AddWikiPage({ page, data, type }));
  }
};

export { addWikiPage };
