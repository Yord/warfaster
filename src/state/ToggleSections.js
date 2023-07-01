import { StateShard } from "./utils";

const ToggleSections = StateShard(
  "ToggleSections",
  init,
  { toggle },
  {},
  { select }
);

export { ToggleSections };

function init(state) {
  if (!state.ui) {
    state.ui = {};
  }

  state.ui.toggleSections = {};
}

// Actions

function toggle(state, { section }) {
  const toggleSections = select(state);
  const showSection = selectSection(state, section);
  toggleSections[section] = !showSection;
}

// Selectors

function select(state) {
  return state.ui.toggleSections;
}

function selectSection(state, section) {
  const toggleSections = select(state);
  return toggleSections[section];
}
