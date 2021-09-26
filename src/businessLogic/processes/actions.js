const action = (type) => (payload) => ({ type, payload });

const AddWikiPage = action("WIKI_PAGE/ADD");
const FetchWikiPage = action("WIKI_PAGE/FETCH");
const FetchedWikiPage = action("WIKI_PAGE/FETCHED");
const FetchWikiPageRevisions = action("WIKI_PAGE_REVISIONS/FETCH");
const FetchedWikiPageRevisions = action("WIKI_PAGE_REVISIONS/FETCHED");
const RefreshWikiPages = action("WIKI_PAGES/REFRESH");
const RemoveUnsuccessfullyParsedPages = action(
  "UNSUCCESSFULLY_PARSED_PAGES/REMOVE"
);
const RemoveWikiPage = action("WIKI_PAGE/REMOVE");
const SetCypher = action("CYPHER/SET");
const SetCypherCodecs = action("CYPHER_CODECS/SET");
const SetFactions = action("FACTIONS/SET");
const SetFactionModels = action("FACTION_MODELS/SET");
const SetModel = action("MODEL/SET");
const SetWildCards = action("WILD_CARDS/SET");

export {
  AddWikiPage,
  FetchWikiPage,
  FetchWikiPageRevisions,
  FetchedWikiPage,
  FetchedWikiPageRevisions,
  RefreshWikiPages,
  RemoveUnsuccessfullyParsedPages,
  RemoveWikiPage,
  SetCypher,
  SetCypherCodecs,
  SetFactions,
  SetFactionModels,
  SetModel,
  SetWildCards,
};