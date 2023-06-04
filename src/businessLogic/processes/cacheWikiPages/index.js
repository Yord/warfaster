import { all } from "redux-saga/effects";
import { fetchWikiPage } from "./fetchWikiPage";
import { updateCache } from "./updateCache";
import { fetchPageIds } from "./fetchPageIds";

function* cacheWikiPages() {
  yield all([fetchPageIds(), updateCache(), fetchWikiPage()]);
}

export { cacheWikiPages };
