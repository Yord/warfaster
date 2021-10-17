import { put, select, take } from "redux-saga/effects";
import { parseFactionModels as parse } from "../../core/parse/parseFactionModelsText";
import { Factions } from "../../state/objects/Factions";
import { FactionModels } from "../../state/objects/FactionModels";

const parseFactionModels = function* () {
  while (true) {
    const { payload } = yield take("WIKI_PAGE/FETCHED");
    const { data, page } = payload;
    const pages = yield select(Factions.selectPages());

    if (pages.includes(page)) {
      const factionModels = parse(data.text);
      yield put(
        FactionModels.set({ factionModels: { [page]: factionModels } }),
      );
    }
  }
};

export { parseFactionModels };
