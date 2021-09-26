const event = (type) => (payload) => ({ type, payload });

const CardDragEnded = event("CARD/DRAG_ENDED");
const CardDragStarted = event("CARD/DRAG_STARTED");
const MenuItemClicked = event("MENU_ITEM/CLICKED");

export { CardDragEnded, CardDragStarted, MenuItemClicked };
