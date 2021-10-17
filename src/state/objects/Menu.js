import { ReduxGroup } from "./utils";

const Menu = ReduxGroup(
  "Menu",
  init,
  {
    toggleCollapsed,
  },
  {},
);

export { Menu };

function init(state) {
  if (!state.ui) {
    state.ui = {};
  }

  state.data.menuCollapsed = false;
}

// Actions

function toggleCollapsed(state) {
  state.ui.menuCollapsed = !state.ui.menuCollapsed;
}

// Selectors
