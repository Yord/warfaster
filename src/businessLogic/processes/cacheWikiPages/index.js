import { all } from "redux-saga/effects";
import { cacheWikiPages as cacheWikiPages2 } from "./cacheWikiPages";
import { updateCache } from "./updateCache";
import { fetchPageIds } from "./fetchPageIds";

function* cacheWikiPages() {
  yield all([fetchPageIds(), updateCache(), cacheWikiPages2()]);
}

export { cacheWikiPages };
