import { put } from "redux-saga/effects";
import { parseCypherCodecsText } from "../../core/parse";
import { CypherCodecs } from "../../../state/CypherCodecs";

function* parseCypherCodecs({ data }) {
  const cypherCodecs = parseCypherCodecsText(data.text);
  yield put(CypherCodecs.set({ cypherCodecs }));
}

export { parseCypherCodecs };
