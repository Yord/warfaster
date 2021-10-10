import { put, take, select } from "redux-saga/effects";
import { parseFactionModels as parse } from "../../core/parse/parseFactionModelsText";
import { SetFactionModels } from "../../../messages";
import { Factions } from "../../state/objects/Factions";

const parseFactionModels = function* () {
  while (true) {
    const { payload } = yield take("WIKI_PAGE/FETCHED");
    const { data, page } = payload;
    const pages = yield select(Factions.selectPages());

    if (pages.includes(page)) {
      const factionModels = parse(data.text);
      yield put(SetFactionModels({ factionModels: { [page]: factionModels } }));
    }
  }
};

export { parseFactionModels };
