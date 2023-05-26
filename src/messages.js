const CardDragEnded = message("CARD/DRAG_ENDED");
const CardDragStarted = message("CARD/DRAG_STARTED");
const MenuItemClicked = message("MENU_ITEM/CLICKED");

const FetchCadreModels = message("CADRE_MODELS/FETCH");
const FetchPageIdsSlice = message("PAGE_IDS_SLICE/FETCH");
const FetchWikiPage = message("WIKI_PAGE/FETCH");
const FetchedWikiPage = message("WIKI_PAGE/FETCHED");
const FetchWikiPageRevisions = message("WIKI_PAGE_REVISIONS/FETCH");
const FetchedWikiPageRevisions = message("WIKI_PAGE_REVISIONS/FETCHED");
const RefreshWikiPages = message("WIKI_PAGES/REFRESH");

export {
  CardDragEnded,
  CardDragStarted,
  FetchCadreModels,
  FetchPageIdsSlice,
  FetchWikiPage,
  FetchWikiPageRevisions,
  FetchedWikiPage,
  FetchedWikiPageRevisions,
  MenuItemClicked,
  RefreshWikiPages,
};

function message(type) {
  return (payload = {}) => ({ type, payload });
}
