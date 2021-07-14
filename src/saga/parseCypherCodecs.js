import { put, take } from "redux-saga/effects";
import { parseCypherCodecs as parse } from "../core/parseCypherCodecs";
import { SetCypherCodecs } from "./actions";

const parseCypherCodecs = function* () {
  while (true) {
    const { payload } = yield take("WIKI_PAGE/ADD");
    const { data, page } = payload;

    if (page === "Cypher_Codecs") {
      const cypherCodecs = parse(data.text);
      yield put(SetCypherCodecs({ cypherCodecs }));
    }
  }
};

export { parseCypherCodecs };
