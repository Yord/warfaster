import { put, select, take } from "redux-saga/effects";
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
import { FetchedWikiPage } from "../../messages";

function* parseWikiPages() {
  while (true) {
    const { payload } = yield take(FetchedWikiPage().type);
    const { data, page } = payload;

    const cypherCodecs = yield select(CypherCodecs.selectPages());
    const factions = yield select(Factions.selectPages());

    // TODO: Why Object.values?
    const factionModels = Object.values(
      yield select(FactionModels.selectModelPages())
    );

    if (page === "Warcaster") {
      const factions = parseFactionsText(data.text);
      yield put(Factions.set({ factions }));
    } else if (page === "Wild_Card") {
      const wildCards = parseWildCardText(data.text);
      yield put(WildCardModels.set({ wildCards }));
    } else if (factionModels.includes(page)) {
      const model = parseModelText(data.text);
      model.name = { text: data.title, page };
      yield put(Models.set({ page, model }));
    } else if (factions.includes(page)) {
      const factionModels = parseFactionModelsText(data.text);
      yield put(FactionModels.set({ page, factionModels }));
    } else if (page === "Cypher_Codecs") {
      const cypherCodecs = parseCypherCodecsText(data.text);
      yield put(CypherCodecs.set({ cypherCodecs }));
    } else if (cypherCodecs.includes(page)) {
      const cypher = parseCypherText(data.text);
      cypher.name = { text: data.title, page };
      yield put(Cyphers.set({ page, cypher }));
    } else {
      // TODO: Cannot parse WikiPage
    }
  }
}

export { parseWikiPages };
