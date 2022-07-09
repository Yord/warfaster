import { put, select, take } from "redux-saga/effects";
import { parseModel as parse } from "../../core/parse/parseModelText";
import { FactionModels } from "../../../state/objects/FactionModels";
import { Models } from "../../../state/objects/Models";

const parseModel = function* () {
  while (true) {
    const { payload } = yield take("WIKI_PAGE/FETCHED");
    const { data, page } = payload;
    const pages = Object.values(
      yield select(FactionModels.selectAllModelPages())
    );

    if (pages.includes(page)) {
      const model = parse(data.text);
      yield put(Models.set({ page, model }));
    }
  }
};

export { parseModel };
