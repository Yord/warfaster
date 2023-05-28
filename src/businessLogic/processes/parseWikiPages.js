import { put, select, take } from "redux-saga/effects";
import {
  parseCypherCodecsText,
  parseCypherText,
  parseFactionModelsText,
  parseFactionsText,
  parseModelText,
  parseVehicleWeapon,
  parseWarjackWeapon,
  parseWildCardText,
} from "../core/parse";
import { Cyphers } from "../../state/Cyphers";
import { CypherCodecs } from "../../state/CypherCodecs";
import { Factions } from "../../state/Factions";
import { FactionModels } from "../../state/FactionModels";
import { Models } from "../../state/Models";
import { VehicleWeapons } from "../../state/VehicleWeapons";
import { WarjackWeapons } from "../../state/WarjackWeapons";
import { WildCardModels } from "../../state/WildCardModels";
import { FetchedWikiPage, FetchPageIdsSlice } from "../../messages";
import { partitionBy } from "./partitionBy";

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

    const wildCardModels = Object.values(
      yield select(WildCardModels.selectModelPages())
    );

    const vehicleWeapons = Object.keys(yield select(VehicleWeapons.select()));
    const warjackWeapons = Object.keys(yield select(WarjackWeapons.select()));

    if (page === "Warcaster") {
      const factions = parseFactionsText(data.text);
      yield put(Factions.set({ factions }));
    } else if (page === "Wild_Card") {
      const wildCards = parseWildCardText(data.text);
      yield put(WildCardModels.set({ wildCards }));
    } else if (factionModels.includes(page) || wildCardModels.includes(page)) {
      const model = parseModelText(data.text);
      model.name = { text: data.title, page };

      const cortexSelections = identifyCortexSelections(
        model.cortexes,
        data.categories
      );

      if (cortexSelections) {
        model.cortexSelections = cortexSelections;
      }

      const warjackWeaponSelections = buildWarjackWeaponSelections(
        model.weaponDetails
      );

      if (warjackWeaponSelections) {
        model.warjackWeaponSelections = warjackWeaponSelections;
      }

      yield put(Models.set({ page, model }));

      let fetchPages = [];

      if (cortexSelections) {
        const cortexCategories = Object.values(cortexSelections).flatMap(
          (advantages) =>
            Object.values(advantages).flatMap(({ category }) => ({
              text: category.replace(/_/g, " "),
              page: category,
            }))
        );

        fetchPages = [...fetchPages, ...cortexCategories];
      }

      if (warjackWeaponSelections) {
        const weaponPages = Object.values(warjackWeaponSelections).map(
          ({ name, page }) => ({ text: name, page })
        );

        fetchPages = [...fetchPages, ...weaponPages];
      }

      if (model.vehicleWeaponSelection) {
        fetchPages = [...fetchPages, ...model.vehicleWeaponSelection];
      }

      if (fetchPages.length > 0) {
        const pageSlices = partitionBy(50, fetchPages);

        for (const pages of pageSlices) {
          yield put(FetchPageIdsSlice({ pages }));
        }
      }
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
    } else if (warjackWeapons.includes(page)) {
      const warjackWeapon = parseWarjackWeapon(data.text);
      yield put(WarjackWeapons.set({ page, warjackWeapon }));
    } else if (vehicleWeapons.includes(page)) {
      const vehicleWeapon = parseVehicleWeapon(data.text);
      yield put(VehicleWeapons.set({ page, vehicleWeapon }));
    } else {
      // TODO: Cannot parse WikiPage
    }
  }
}

export { parseWikiPages };

function buildWarjackWeaponSelections(weaponDetails) {
  if (!weaponDetails) {
    return undefined;
  }

  return Object.fromEntries(
    weaponDetails.map(({ Cost, Location, Weapon }) => [
      Weapon.page,
      {
        cost: Cost.text,
        location: Location.text,
        name: Weapon.text,
        page: Weapon.page,
      },
    ])
  );
}

function identifyCortexSelections(cortexes, categories) {
  if (
    !cortexes ||
    Object.entries(cortexes).length === 0 ||
    !categories ||
    Object.entries(categories).length === 0
  ) {
    return undefined;
  }

  const categoryTexts = categories.map(({ category }) => category);

  return Object.fromEntries(
    Object.entries(cortexes).map(([cortex, advantages]) => [
      cortex,
      Object.fromEntries(
        Object.entries(advantages).map(([advantage, text]) => [
          advantage,
          {
            category: `Category:${findClosestCategory(
              advantage,
              categoryTexts
            )}`,
            text,
          },
        ])
      ),
    ])
  );
}

function findClosestCategory(advantage, categoryTexts) {
  return categoryTexts.find(
    (category) => advantage === category.replace(/^WNM_/, "").replace(/_/g, " ")
  );
}
