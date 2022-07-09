import { ReduxGroup } from "./utils";

const Menu = ReduxGroup("Menu", init, { toggleCollapsed }, { selectCollapsed });

export { Menu };

function init(state) {
  if (!state.ui) {
    state.ui = {};
  }

  state.ui.menu = { collapsed: false };
}

// Actions

function toggleCollapsed(state) {
  const menu = select(state);
  menu.collapsed = !menu.collapsed;
}

// Selectors

function select(state) {
  return state.ui.menu;
}

function selectCollapsed(state) {
  const menu = select(state);
  return menu.collapsed;
}
