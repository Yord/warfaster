import { put, take, select } from "redux-saga/effects";
import { parseModel as parse } from "../../core/parse/parseModelText";
import { SetModel } from "../actions";
import { factionModels } from "../../../state/dataAccess/factionModels";

const parseModel = function* () {
  while (true) {
    const { payload } = yield take("WIKI_PAGE/FETCHED");
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
