import { put, select, take } from "redux-saga/effects";
import { parseCypher as parse } from "../../core/parse/parseCypherText";
import { Cyphers } from "../../../state/objects/Cyphers";
import { CypherCodecs } from "../../../state/objects/CypherCodecs";

const parseCypher = function* () {
  while (true) {
    const { payload } = yield take("WIKI_PAGE/FETCHED");
    const { data, page } = payload;
    const pages = yield select(CypherCodecs.selectPages());

    if (pages.includes(page)) {
      const cypher = parse(data.text);
      yield put(Cyphers.set({ page, cypher }));
    }
  }
};

export { parseCypher };
