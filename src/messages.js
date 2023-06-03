const CardDragEnded = message("CARD/DRAG_ENDED");
const CardDragStarted = message("CARD/DRAG_STARTED");
const MenuItemClicked = message("MENU_ITEM/CLICKED");

const FetchedWikiPage = message("WIKI_PAGE/FETCHED");
const FetchedWikiPageRevisions = message("WIKI_PAGE_REVISIONS/FETCHED");
const RefreshWikiPages = message("WIKI_PAGES/REFRESH");

export {
  CardDragEnded,
  CardDragStarted,
  FetchedWikiPage,
  FetchedWikiPageRevisions,
  MenuItemClicked,
  RefreshWikiPages,
};

function message(type) {
  return (payload = {}) => ({ type, payload });
}
