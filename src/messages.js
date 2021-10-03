const message =
  (type) =>
  (payload = {}) => ({ type, payload });

const AddCard = message("LIST/ADD_CARD");
const ToggleMenuCollapse = message("MENU/TOGGLE_COLLAPSE");
const SetDragging = message("DRAGGING/SET");

const CardDragEnded = message("CARD/DRAG_ENDED");
const CardDragStarted = message("CARD/DRAG_STARTED");
const MenuItemClicked = message("MENU_ITEM/CLICKED");

const FetchWikiPage = message("WIKI_PAGE/FETCH");
const FetchedWikiPage = message("WIKI_PAGE/FETCHED");
const FetchWikiPageRevisions = message("WIKI_PAGE_REVISIONS/FETCH");
const FetchedWikiPageRevisions = message("WIKI_PAGE_REVISIONS/FETCHED");
const RefreshWikiPages = message("WIKI_PAGES/REFRESH");
const SetCypher = message("CYPHER/SET");
const SetCypherCodecs = message("CYPHER_CODECS/SET");
const SetFactions = message("FACTIONS/SET");
const SetFactionModels = message("FACTION_MODELS/SET");
const SetModel = message("MODEL/SET");
const SetWildCards = message("WILD_CARDS/SET");

export {
  message,
  CardDragEnded,
  CardDragStarted,
  MenuItemClicked,
  AddCard,
  FetchWikiPage,
  FetchWikiPageRevisions,
  FetchedWikiPage,
  FetchedWikiPageRevisions,
  RefreshWikiPages,
  SetCypher,
  SetCypherCodecs,
  SetDragging,
  SetFactions,
  SetFactionModels,
  SetModel,
  SetWildCards,
  ToggleMenuCollapse,
};
