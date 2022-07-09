import { all, put, select, take } from "redux-saga/effects";
import {
  parseCypherCodecsText,
  parseCypherText,
  parseFactionModelsText,
  parseFactionsText,
  parseModelText,
  parseWildCardText,
} from "../core/parse";
import { Cyphers } from "../../state/Cyphers";
import { CypherCodecs } from "../../state/CypherCodecs";
import { Factions } from "../../state/Factions";
import { FactionModels } from "../../state/FactionModels";
import { Models } from "../../state/Models";
import { WildCardModels } from "../../state/WildCardModels";

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
    const pages = yield select(CypherCodecs.selectPages());

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
      yield put(CypherCodecs.set({ cypherCodecs }));
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
      yield put(FactionModels.set({ page, factionModels }));
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
    const pages = Object.values(yield select(FactionModels.selectModelPages()));

    if (pages.includes(page)) {
      const model = parseModelText(data.text);
      model.name = { text: data.title, page };
      yield put(Models.set({ page, model }));
    }
  }
}

function* parseWildCard() {
  while (true) {
    const { payload } = yield take("WIKI_PAGE/FETCHED");
    const { data, page } = payload;

    if (page === "Wild_Card") {
      const wildCards = parseWildCardText(data.text);
      yield put(WildCardModels.set({ wildCards }));
    }
  }
}
