import { StateShard } from "./utils";

const VehicleWeapons = StateShard(
  "VehicleWeapons",
  init,
  { set },
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

function set(state, { page, vehicleWeapon }) {
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
