import { all } from "redux-saga/effects";
import { cacheWikiPages as cacheWikiPages2 } from "./cacheWikiPages";
import { updateCache } from "./updateCache";

function* cacheWikiPages() {
  yield all([updateCache(), cacheWikiPages2()]);
}

export { cacheWikiPages };
