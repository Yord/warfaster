import { all, take } from "redux-saga/effects";
import { Factions } from "../../state/Factions";
import { Requests } from "../../state/io/Requests";

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
      yield* Requests.parsePage({ page, parserName: "parseFactionModels" });
    }
  }
}
