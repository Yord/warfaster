import { put, take, select } from "redux-saga/effects";
import { parseModel as parse } from "../core/parseModel";
import { SetModel } from "./actions";
import { factionModels } from "../store/factionModels";

const parseModel = function* () {
  while (true) {
    const { payload } = yield take("WIKI_PAGE/ADD");
    const { data, page } = payload;
    const pages = Object.values(
      yield select(factionModels.selectAllModelPages)
    );

    if (pages.includes(page)) {
      const model = parse(data.text);
      yield put(SetModel({ page, model }));
    }
  }
};

export { parseModel };
