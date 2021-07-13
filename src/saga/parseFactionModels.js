import { put, take, select } from "redux-saga/effects";
import { parseFactionModels as parse } from "../core/parseFactionModels";
import { SetModels } from "./actions";
import { factions } from "../store/factions";

const parseFactionModels = function* () {
  while (true) {
    const { payload } = yield take("WIKI_PAGE/ADD");
    const { data, page } = payload;
    const pages = Object.values(yield select(factions.select));

    if (pages.includes(page)) {
      const models = parse(data.text);
      yield put(SetModels({ models: { [page]: models } }));
    }
  }
};

export { parseFactionModels };
