import { put, take, select } from "redux-saga/effects";
import { parseCypher as parse } from "../../core/parse/parseCypherText";
import { cypherCodecs } from "../../../state/dataAccess/cypherCodecs";
import { Cyphers } from "../../../state/objects/Cyphers";

const parseCypher = function* () {
  while (true) {
    const { payload } = yield take("WIKI_PAGE/FETCHED");
    const { data, page } = payload;
    const pages = yield select(cypherCodecs.selectAllCypherPages);

    if (pages.includes(page)) {
      const cypher = parse(data.text);
      yield put(Cyphers.set({ page, cypher }));
    }
  }
};

export { parseCypher };
