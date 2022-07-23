import { StateShard } from "./utils";

const Version = StateShard("Version", init, {}, {});

export { Version };

function init(state) {
  state.version = "2022-07-23T21:32:02.322Z";
}
