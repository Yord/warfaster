/*
These sagas prevent partially cached data.

In exceptional cases, a page may have been fetched and cached, but before the
card was able to be parsed and cached, the app was closed. In such a case,
parsing the card cannot be triggered any more, since the page is not refeched
because it is already cached. The saga defined here identifies unparsed pages
and removes them from the cache.
*/

import { put } from "redux-saga/effects";
import { RemoveUnsuccessfullyParsedPages } from "../actions";

const removeUnsuccessfullyParsedPages = function* () {
  yield put(RemoveUnsuccessfullyParsedPages());
};

export { removeUnsuccessfullyParsedPages };
