import { put, select } from "redux-saga/effects";
import { parseVehicleAndWarjackWeaponText } from "../../core/parse";
import { VehicleWeapons } from "../../../state/VehicleWeapons";
import { WarjackWeapons } from "../../../state/WarjackWeapons";
import { Models } from "../../../state/Models";

function* parseVehicleOrWarjackWeapon({ data, page }) {
  const { vehicleWeapon, vehicleOrWarjackWeapon, warjackWeapon } =
    parseVehicleAndWarjackWeaponText(data.text);

  if (vehicleWeapon) yield put(VehicleWeapons.set({ page, vehicleWeapon }));
  if (warjackWeapon) yield put(WarjackWeapons.set({ page, warjackWeapon }));
  if (vehicleOrWarjackWeapon) {
    const models = Object.values(yield select(Models.select()));

    const vehicles = models.filter(({ types }) =>
      types.some(({ text }) => text === "Vehicle")
    );
    const warjacks = models.filter(({ types }) =>
      types.some(({ text }) => text === "Warjack")
    );

    console.log({ vehicles, warjacks });

    const vehicleWeapons = vehicles.flatMap((vehicle) =>
      vehicle.vehicleWeaponSelection.map((weapon) => weapon.page)
    );
    const warjackWeapons = warjacks.flatMap((warjack) =>
      !warjack.weaponDetails
        ? []
        : warjack.weaponDetails.map(({ Weapon }) => Weapon.page)
    );

    console.log({ vehicleWeapons, warjackWeapons });

    if (vehicleWeapons.includes(page) && warjackWeapons.includes(page)) {
      console.error(
        `Vehicle weapons and warjack weapons cannot both contain page ${page}!`
      );
    }

    if (vehicleWeapons.includes(page)) {
      yield put(
        VehicleWeapons.set({ page, vehicleWeapon: vehicleOrWarjackWeapon })
      );
    }

    if (warjackWeapons.includes(page)) {
      yield put(
        WarjackWeapons.set({ page, warjackWeapon: vehicleOrWarjackWeapon })
      );
    }
  }
}

export { parseVehicleOrWarjackWeapon };
