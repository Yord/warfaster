import { StateShard } from "./utils";

const Version = StateShard("Version", init, {}, {}, {});

export { Version };

function init(state) {
  state.version = "2023-06-03T23:25:00.000Z";
}
