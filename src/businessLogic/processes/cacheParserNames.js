import { put, take } from "redux-saga/effects";

import { Requests } from "../../state/io/Requests";
import { ParserNames } from "../../state/ParserNames";

function* cacheParserNames() {
  while (true) {
    const action = yield take(Requests.fetch().type);
    const { payload } = action;
    const { desc, queryParams, parserName } = payload;

    if (desc !== "parsePage") {
      continue;
    }

    const page = queryParams.page;

    if (!page || !parserName) {
      console.error("Could not cache parser!", { page, parserName }, action);
      continue;
    }

    yield put(ParserNames.setForPage({ page, parserName }));
  }
}

export { cacheParserNames };
