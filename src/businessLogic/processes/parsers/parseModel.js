import { put } from "redux-saga/effects";
import { parseModelText } from "../../core/parse";
import { Models } from "../../../state/Models";
import { partitionBy } from "../partitionBy";
import { Requests } from "../../../state/io/Requests";

function* parseModel({ data, page }) {
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
      yield* Requests.queryPageIds({ pages: pages });
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
