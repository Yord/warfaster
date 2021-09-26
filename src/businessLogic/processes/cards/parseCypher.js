import { put, take, select } from "redux-saga/effects";
import { parseCypher as parse } from "../../core/parse/parseCypherText";
import { SetCypher } from "../actions";
import { cypherCodecs } from "../../../state/dataAccess/cypherCodecs";

const parseCypher = function* () {
  while (true) {
    const { payload } = yield take("WIKI_PAGE/FETCHED");
    const { data, page } = payload;
    const pages = yield select(cypherCodecs.selectAllCypherPages);

    if (pages.includes(page)) {
      const cypher = parse(data.text);
      yield put(SetCypher({ page, cypher }));
    }
  }
};

export { parseCypher };