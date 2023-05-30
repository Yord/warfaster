import { StateShard } from "./utils";

const Version = StateShard("Version", init, {}, {});

export { Version };

function init(state) {
  state.version = "2023-05-30T15:50:00.000Z";
}
