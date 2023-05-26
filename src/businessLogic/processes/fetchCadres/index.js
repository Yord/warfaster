/*
These sagas load meta data necessary for grouping models into cadres.

`fetchCadreCategoryMembers` gets a list of all cadres in game, while `fetchCadreModels` fetches
the cadre models for a given cadre.
*/

import { all } from "redux-saga/effects";
import { fetchCadreCategoryMembers } from "./fetchCadreCategoryMembers";
import { fetchCadreModels } from "./fetchCadreModels";

function* fetchCadres() {
  yield all([fetchCadreCategoryMembers(), fetchCadreModels()]);
}

export { fetchCadres };
