import { put } from "redux-saga/effects";
import { RemoveUnsuccessfullyParsedPages } from "./actions";

const removeUnsuccessfullyParsedPages = function* () {
  yield put(RemoveUnsuccessfullyParsedPages());
};

export { removeUnsuccessfullyParsedPages };
