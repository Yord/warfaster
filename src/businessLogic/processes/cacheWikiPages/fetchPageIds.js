import { all, put, take, select } from "redux-saga/effects";

import { AppSync } from "../../../state/AppSync";
import { CypherCodecs } from "../../../state/CypherCodecs";
import { FactionModels } from "../../../state/FactionModels";
import { Factions } from "../../../state/Factions";
import { PageIds } from "../../../state/PageIds";
import { WildCardModels } from "../../../state/WildCardModels";

import { partitionBy } from "../partitionBy";
import { Requests } from "../../../state/io/Requests";

function* fetchPageIds() {
  const cachedPageIds = yield select(PageIds.select());

  if (Object.keys(cachedPageIds).length === 0) {
    const [factionsSet] = yield all([
      take(Factions.set().type),
      take(CypherCodecs.set().type),
      take(WildCardModels.set().type),
    ]);

    const factions = Object.keys(factionsSet.payload.factions);

    yield all(
      factions.map((faction) =>
        take(
          (action) =>
            action.type === FactionModels.setForPage().type &&
            action.payload.page === faction
        )
      )
    );

    const factionModelPages = Object.values(
      yield select(FactionModels.select())
    )
      .flat()
      .map((_) => _.Name);

    const wildCardPages = Object.values(yield select(WildCardModels.select()))
      .flat()
      .map((_) => _.Name)
      .sort(({ text, page }) => [text, page])
      .filter(
        ({ text, page }, index, cards) =>
          !index ||
          (text !== cards[index - 1].text && page !== cards[index - 1].page)
      );

    const cypherPages = (yield select(CypherCodecs.select())).map(
      (_) => _.Cypher
    );

    const pages = [...factionModelPages, ...wildCardPages, ...cypherPages].sort(
      (_) => _.page
    );
    const pageSlices = partitionBy(50, pages);

    for (const pages of pageSlices) {
      yield* Requests.queryPageIds({ pages });
    }

    let processedCount = 0;
    while (yield take(PageIds.addPages().type)) {
      processedCount += 1;
      if (pageSlices.length === processedCount) {
        yield put(AppSync.done());
      }
    }
  }
}

export { fetchPageIds };
