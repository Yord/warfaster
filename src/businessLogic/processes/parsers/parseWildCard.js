import { put } from "redux-saga/effects";
import { parseWildCardText } from "../../core/parse";
import { WildCardModels } from "../../../state/WildCardModels";

function* parseWildCard({ data }) {
  const wildCards = parseWildCardText(data.text);
  yield put(WildCardModels.set({ wildCards }));
}

export { parseWildCard };
