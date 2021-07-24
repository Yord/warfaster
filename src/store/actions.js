const action = (type) => (payload) => ({ type, payload });

const ToggleMenuCollapse = action("MENU/TOGGLE_COLLAPSE");

export { ToggleMenuCollapse };
