import { select, take } from "redux-saga/effects";

import { FetchedWikiPage } from "../../messages";
import parsers from "./parsers";
import { Requests } from "../../state/io/Requests";

function* parseWikiPages() {
  while (true) {
    const { payload } = yield take(FetchedWikiPage().type);
    const { page } = payload;

    const requests = yield select(Requests.select());

    const request = requests.find(
      ({ queryParams }) =>
        queryParams.action === "parse" && queryParams.page === page
    );
    if (!request) {
      console.error("Request invalid!", request);
      continue;
    }

    const parser = parsers[request.parserName];
    if (!parser) {
      console.error(`Parser with name ${request.parserName} not found!`);
      continue;
    }

    yield* parser(payload);
  }
}

export { parseWikiPages };
