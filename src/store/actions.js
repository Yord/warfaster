const action = (type) => (payload) => ({ type, payload });

const AddCard = action("LIST/ADD_CARD");
const ToggleMenuCollapse = action("MENU/TOGGLE_COLLAPSE");
const SetDragging = action("DRAGGING/SET");

export { AddCard, SetDragging, ToggleMenuCollapse };
