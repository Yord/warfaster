import { put } from "redux-saga/effects";
import { parseModelText } from "../../core/parse";
import { Models } from "../../../state/Models";
import { partitionBy } from "../partitionBy";
import { Requests } from "../../../state/io/Requests";

function* parseModel({ data, page }) {
  const model = parseModelText(data.text);
  model.name = { text: data.title, page };

  const coreStats = model.coreStats;

  for (const coreStat of coreStats) {
    const cortexSelections = identifyCortexSelections(
      coreStat.cortexes,
      data.categories
    );

    if (cortexSelections) {
      coreStat.cortexSelections = cortexSelections;
    }

    const warjackWeaponSelections = buildWarjackWeaponSelections(
      coreStat.weaponDetails
    );

    if (warjackWeaponSelections) {
      coreStat.warjackWeaponSelections = warjackWeaponSelections;
    }
  }

  yield put(Models.setForPage({ page, model }));

  let fetchPages = [];

  for (const coreStat of coreStats) {
    if (coreStat.cortexSelections) {
      const cortexCategories = Object.values(coreStat.cortexSelections).flatMap(
        (advantages) =>
          Object.values(advantages).flatMap(({ category }) => ({
            text: category.replace(/_/g, " "),
            page: category,
          }))
      );

      fetchPages = [...fetchPages, ...cortexCategories];
    }

    if (coreStat.warjackWeaponSelections) {
      const weaponPages = Object.values(coreStat.warjackWeaponSelections).map(
        ({ name, page }) => ({ text: name, page })
      );

      fetchPages = [...fetchPages, ...weaponPages];
    }

    if (coreStat.vehicleWeaponSelection) {
      fetchPages = [...fetchPages, ...coreStat.vehicleWeaponSelection];
    }

    if (fetchPages.length > 0) {
      const pageSlices = partitionBy(50, fetchPages);

      for (const pages of pageSlices) {
        yield* Requests.queryPageIds({ pages: pages });
      }
    }
  }
}

export { parseModel };

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
