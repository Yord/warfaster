import { StateShard } from "./utils";

const Version = StateShard("Version", init, {}, {});

export { Version };

function init(state) {
  state.version = "2022-08-07T11:09:13.730Z";
}
