const action = (type) => (payload) => ({ type, payload });

const AddCard = action("LIST/ADD_CARD");
const ToggleMenuCollapse = action("MENU/TOGGLE_COLLAPSE");

export { AddCard, ToggleMenuCollapse };
