import {
  actionChannel,
  all,
  call,
  delay,
  put,
  select,
  take,
} from "redux-saga/effects";
import { CadreCategoryMembers } from "../../../state/CadreCategoryMembers";
import { CadreModels } from "../../../state/CadreModels";
import { jsonp } from "../jsonp";
import { FetchCadreModels } from "../../../messages";
import { Requests } from "../../../state/io/Requests";

function* fetchCadreModels() {
  yield all([fetchCadreModelsForAllCategoryMembers(), fetchCadreModelsPage()]);
}

export { fetchCadreModels };

function* fetchCadreModelsForAllCategoryMembers() {
  while (true) {
    const {
      payload: { cadreCategoryMembers },
    } = yield take(CadreCategoryMembers.set().type);

    const pageIds = Object.keys(cadreCategoryMembers);
    for (const pageId of pageIds) {
      yield put(Requests.queryCadreModels({ pageId, parserName: "???" })); // TODO: assign parser name
      yield put(FetchCadreModels({ cadrePageId: pageId }));
    }
  }
}

function* fetchCadreModelsPage() {
  const cadreModelsChannel = yield actionChannel(FetchCadreModels().type);

  while (true) {
    const {
      payload: { cadrePageId },
    } = yield take(cadreModelsChannel);

    const cadreModels = yield select(
      CadreModels.selectCadreModelsByPageId(cadrePageId)
    );

    if (!cadreModels) {
      const { batchcomplete, query } = yield call(
        jsonp,
        fetchModels(cadrePageId)
      );
      if (batchcomplete && query) {
        const categoryMembers = query.categorymembers;
        if (categoryMembers) {
          const cadreModels = categoryMembers.map(({ pageid, title }) => ({
            pageId: pageid,
            title,
          }));

          yield put(CadreModels.setByCadrePageId({ cadrePageId, cadreModels }));
        }
      }

      const twoSecondsInMs = 2 * 1000;
      yield delay(twoSecondsInMs);
    }
  }
}

function fetchModels(pageId) {
  return `https://privateerpress.wiki/api.php?action=query&formatversion=2&format=json&list=categorymembers&cmpageid=${pageId}&cmtype=page&cmlimit=max`;
}
