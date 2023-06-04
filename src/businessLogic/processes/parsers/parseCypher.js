import { put } from "redux-saga/effects";
import { parseCypherText } from "../../core/parse";
import { Cyphers } from "../../../state/Cyphers";

function* parseCypher({ data, page }) {
  const cypher = parseCypherText(data.text);
  cypher.name = { text: data.title, page };
  yield put(Cyphers.setForPage({ page, cypher }));
}

export { parseCypher };
