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
          !index || (text !== cards[index].text && page !== cards[index].page)
      );

    const cypherPages = (yield select(CypherCodecs.select())).map(
      (_) => _.Cypher
    );

    const pages = [...factionModelPages, ...wildCardPages, ...cypherPages].sort(
      (_) => _.page
    );
    const pageSlices = partitionBy(50, pages);

    for (const pages of pageSlices) {
      yield put({ type: "PAGE_IDS_SLICE/FETCH", payload: { pages } });
    }
  }
}

function* fetchPageIdsSlice() {
  const pageIdsSliceChannel = yield actionChannel("PAGE_IDS_SLICE/FETCH");

  while (true) {
    const { payload } = yield take(pageIdsSliceChannel);
    const pages = payload.pages;

    const data = yield call(jsonp, pageInfo(pages.map((_) => _.text)));
    const titleToPageId = Object.fromEntries(
      data.query.pages.map(({ title, pageid }) => [title, pageid])
    );

    const pageIdByTitle = Object.fromEntries(
      pages.map(({ text, page }) => [page, titleToPageId[text]])
    );

    yield put(PageIds.addPages({ pageIdByTitle }));

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
