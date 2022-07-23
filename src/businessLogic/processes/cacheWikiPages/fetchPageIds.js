import {
  actionChannel,
  all,
  call,
  delay,
  put,
  take,
  select,
} from "redux-saga/effects";
import { jsonp } from "../jsonp";

import { AppSync } from "../../../state/AppSync";
import { CypherCodecs } from "../../../state/CypherCodecs";
import { FactionModels } from "../../../state/FactionModels";
import { Factions } from "../../../state/Factions";
import { PageIds } from "../../../state/PageIds";
import { WildCardModels } from "../../../state/WildCardModels";

function* fetchPageIds() {
  yield all([fetchPageIds2(), fetchPageIdsSlice()]);
}

export { fetchPageIds };

function* fetchPageIds2() {
  const cachedPageIds = yield select(PageIds.select());

  if (Object.keys(cachedPageIds).length === 0) {
    yield put(
      AppSync.addReasons({
        reasons: [
          "Loading factions",
          "Loading cyphers",
          "Loading wildcard models",
        ],
      })
    );

    const [factionsSet] = yield all([
      take(Factions.set().type),
      take(CypherCodecs.set().type),
      take(WildCardModels.set().type),
    ]);

    const factions = Object.keys(factionsSet.payload.factions);

    yield put(
      AppSync.addReasons({
        reasons: factions.map(
          (faction) => `Loading ${faction.replace(/_/g, " ")}`
        ),
      })
    );

    yield all(
      factions.map((faction) =>
        take(
          (action) =>
            action.type === FactionModels.set().type &&
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

    yield put(
      AppSync.addReasons({
        reasons: pageSlices.map(
          (_, index) => `Loading page ids ${index + 1} of ${pageSlices.length}`
        ),
      })
    );

    for (const pages of pageSlices) {
      yield put({
        type: "PAGE_IDS_SLICE/FETCH",
        payload: { pages, count: pageSlices.length },
      });
    }
  }
}

function* fetchPageIdsSlice() {
  const pageIdsSliceChannel = yield actionChannel("PAGE_IDS_SLICE/FETCH");

  let processedCount = 0;

  while (true) {
    const { payload } = yield take(pageIdsSliceChannel);
    const pages = payload.pages;
    const count = payload.count;

    const data = yield call(jsonp, pageInfo(pages.map((_) => _.text)));
    const titleToPageId = Object.fromEntries(
      data.query.pages.map(({ title, pageid }) => [title, pageid])
    );

    const pageIdByTitle = Object.fromEntries(
      pages.map(({ text, page }) => [page, titleToPageId[text]])
    );

    yield put(PageIds.addPages({ pageIdByTitle }));

    processedCount += 1;

    if (count === processedCount) {
      yield put(AppSync.done());
    }

    const twoSecondsInMs = 2 * 1000;
    yield delay(twoSecondsInMs);
  }
}

function pageInfo(pages) {
  const pageList = encodeURIComponent(pages.join("|"));
  return `https://privateerpress.wiki/api.php?action=query&formatversion=2&format=json&prop=pageprops&titles=${pageList}`;
}

function partitionBy(slice, array) {
  var arrays = [];

  for (var i = 0; i < array.length; i += slice) {
    arrays[arrays.length] = array.slice(i, i + slice);
  }

  return arrays;
}
