import { StateShard } from "./utils";

const Version = StateShard("Version", init, {}, {});

export { Version };

function init(state) {
  state.version = "2023-05-21T21:55:00.000Z";
}
