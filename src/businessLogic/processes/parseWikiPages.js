import { all, put, take, select } from "redux-saga/effects";
import {
  SetCypherCodecs,
  SetFactionModels,
  SetModel,
  SetWildCards,
} from "../../messages";
import {
  parseCypherText,
  parseCypherCodecsText,
  parseFactionModelsText,
  parseFactionsText,
  parseModelText,
  parseWildCardText,
} from "../core/parse";
import { cypherCodecs, factionModels } from "../../state/dataAccess";
import { Factions } from "../../state/objects/Factions";
import { Cyphers } from "../../state/objects/Cyphers";

function* parseWikiPages() {
  yield all([
    parseCypher(),
    parseCypherCodecs(),
    parseFactions(),
    parseFactionModels(),
    parseModel(),
    parseWildCard(),
  ]);
}

export { parseWikiPages };

function* parseCypher() {
  while (true) {
    const { payload } = yield take("WIKI_PAGE/FETCHED");
    const { data, page } = payload;
    const pages = yield select(cypherCodecs.selectAllCypherPages);

    if (pages.includes(page)) {
      const cypher = parseCypherText(data.text);
      cypher.name = { text: data.title, page };
      yield put(Cyphers.set({ page, cypher }));
    }
  }
}

function* parseCypherCodecs() {
  while (true) {
    const { payload } = yield take("WIKI_PAGE/FETCHED");
    const { data, page } = payload;

    if (page === "Cypher_Codecs") {
      const cypherCodecs = parseCypherCodecsText(data.text);
      yield put(SetCypherCodecs({ cypherCodecs }));
    }
  }
}

function* parseFactionModels() {
  while (true) {
    const { payload } = yield take("WIKI_PAGE/FETCHED");
    const { data, page } = payload;
    const pages = yield select(Factions.selectPages());

    if (pages.includes(page)) {
      const factionModels = parseFactionModelsText(data.text);
      yield put(SetFactionModels({ page, factionModels }));
    }
  }
}

function* parseFactions() {
  while (true) {
    const { payload } = yield take("WIKI_PAGE/FETCHED");
    const { data, page } = payload;

    if (page === "Warcaster") {
      const factions = parseFactionsText(data.text);
      yield put(Factions.set({ factions }));
    }
  }
}

function* parseModel() {
  while (true) {
    const { payload } = yield take("WIKI_PAGE/FETCHED");
    const { data, page } = payload;
    const pages = Object.values(
      yield select(factionModels.selectAllModelPages)
    );

    if (pages.includes(page)) {
      const model = parseModelText(data.text);
      model.name = { text: data.title, page };
      yield put(SetModel({ page, model }));
    }
  }
}

function* parseWildCard() {
  while (true) {
    const { payload } = yield take("WIKI_PAGE/FETCHED");
    const { data, page } = payload;

    if (page === "Wild_Card") {
      const wildCards = parseWildCardText(data.text);
      yield put(SetWildCards({ wildCards }));
    }
  }
}
