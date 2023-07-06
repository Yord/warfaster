import { StateShard } from "./utils";

const Version = StateShard("Version", init, {}, {}, {});

export { Version };

function init(state) {
  state.version = "2023-07-06T22:58:00.000Z";
}
