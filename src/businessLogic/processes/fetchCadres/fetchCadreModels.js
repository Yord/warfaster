import { take } from "redux-saga/effects";
import { CadreCategoryMembers } from "../../../state/CadreCategoryMembers";
import { Requests } from "../../../state/io/Requests";

function* fetchCadreModels() {
  while (true) {
    const {
      payload: { cadreCategoryMembers },
    } = yield take(CadreCategoryMembers.set().type);

    const pageIds = Object.keys(cadreCategoryMembers);
    for (const pageId of pageIds) {
      yield* Requests.queryCadreModels({ pageId });
    }
  }
}

export { fetchCadreModels };
