import { put } from "redux-saga/effects";
import { parseFactionsText } from "../../core/parse";
import { Factions } from "../../../state/Factions";

function* parseFactions({ data }) {
  const factions = parseFactionsText(data.text);
  yield put(Factions.set({ factions }));
}

export { parseFactions };
