import { put } from "redux-saga/effects";
import { parseFactionModelsText } from "../../core/parse";
import { FactionModels } from "../../../state/FactionModels";

function* parseFactionModels({ data, page }) {
  const factionModels = parseFactionModelsText(data.text);
  yield put(FactionModels.set({ page, factionModels }));
}

export { parseFactionModels };
