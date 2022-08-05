const message =
  (type) =>
  (payload = {}) => ({ type, payload });

const CardDragEnded = message("CARD/DRAG_ENDED");
const CardDragStarted = message("CARD/DRAG_STARTED");
const MenuItemClicked = message("MENU_ITEM/CLICKED");

const FetchPageIdsSlice = message("PAGE_IDS_SLICE/FETCH");
const FetchWikiPage = message("WIKI_PAGE/FETCH");
const FetchedWikiPage = message("WIKI_PAGE/FETCHED");
const FetchWikiPageRevisions = message("WIKI_PAGE_REVISIONS/FETCH");
const FetchedWikiPageRevisions = message("WIKI_PAGE_REVISIONS/FETCHED");
const RefreshWikiPages = message("WIKI_PAGES/REFRESH");

export {
  CardDragEnded,
  CardDragStarted,
  FetchPageIdsSlice,
  FetchedWikiPage,
  FetchedWikiPageRevisions,
  FetchWikiPage,
  FetchWikiPageRevisions,
  MenuItemClicked,
  message,
  RefreshWikiPages,
};
