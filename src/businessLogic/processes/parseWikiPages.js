import { select, take } from "redux-saga/effects";

import { FetchedWikiPage } from "../../messages";
import parsers from "./parsers";
import { ParserNames } from "../../state/ParserNames";

function* parseWikiPages() {
  while (true) {
    const action = yield take(FetchedWikiPage().type);
    const { payload } = action;

    let parserName = payload.parserName;
    if (!parserName) {
      parserName = yield select(ParserNames.selectByPage(payload.page));
    }

    if (!parserName) {
      console.error("Parser name not found!", action);
      continue;
    }

    const parser = parsers[parserName];

    if (!parser) {
      console.error("Parser not found!", action);
      continue;
    }

    yield* parser(payload);
  }
}

export { parseWikiPages };
