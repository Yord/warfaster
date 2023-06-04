import { StateShard } from "./utils";

const VehicleWeapons = StateShard(
  "VehicleWeapons",
  init,
  { setForPage },
  {},
  { select, selectByPage }
);

export { VehicleWeapons };

function init(state) {
  if (!state.data) {
    state.data = {};
  }

  state.data.vehicleWeapons = {};
}

// Actions

function setForPage(state, { page, vehicleWeapon }) {
  const vehicleWeapons = select(state);
  vehicleWeapons[page] = vehicleWeapon;
}

// Selectors

function select(state) {
  return state.data.vehicleWeapons;
}

function selectByPage(state, page) {
  const vehicleWeapons = select(state);
  return vehicleWeapons[page];
}
