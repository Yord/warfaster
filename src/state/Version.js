import { StateShard } from "./utils";

const Version = StateShard("Version", init, {}, {}, {});

export { Version };

function init(state) {
  state.version = "2023-06-04T12:56:00.000Z";
}
