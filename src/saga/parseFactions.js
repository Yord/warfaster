import { put, take } from "redux-saga/effects";
import { parseFactions as parse } from "../core/parseFactions";

const parseFactions = function* () {
  while (true) {
    const { payload } = yield take("WIKI_PAGE/ADD");
    const { data, page } = payload;

    if (page === "Warcaster") {
      const factions = parse(data.text);
      yield put({ type: "FACTIONS/SET", payload: { factions } });
    }
  }
};

export { parseFactions };
