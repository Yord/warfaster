import { put, take, select } from "redux-saga/effects";
import { parseCypher as parse } from "../core/parseCypher";
import { SetCypher } from "./actions";
import { cypherCodecs } from "../store/cypherCodecs";

const parseCypher = function* () {
  while (true) {
    const { payload } = yield take("WIKI_PAGE/ADD");
    const { data, page } = payload;
    const pages = Object.values(
      yield select(cypherCodecs.selectAllCypherPages)
    );

    if (pages.includes(page)) {
      const cypher = parse(data.text);
      yield put(SetCypher({ page, cypher }));
    }
  }
};

export { parseCypher };
