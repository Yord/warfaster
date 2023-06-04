import { StateShard } from "./utils";

const Version = StateShard("Version", init, {}, {}, {});

export { Version };

function init(state) {
  state.version = "2023-06-04T21:13:15.000Z";
}
