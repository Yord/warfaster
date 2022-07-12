import { all, put, take } from "redux-saga/effects";
import { FetchWikiPage } from "../../messages";
import { Factions } from "../../state/Factions";

function* triggerFetchWikiPages() {
  yield all([triggerFetchFactions()]);
}

export { triggerFetchWikiPages };

function* triggerFetchFactions() {
  while (true) {
    const { payload } = yield take(Factions.set().type);
    const { factions } = payload;

    const factionPages = Object.values(factions).map((faction) => faction.page);

    for (const page of factionPages) {
      yield put(FetchWikiPage({ page }));
    }
  }
}
