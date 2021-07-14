const action = (type) => (payload) => ({ type, payload });

const AddWikiPage = action("WIKI_PAGE/ADD");
const FetchWikiPage = action("WIKI_PAGE/FETCH");
const RemoveUnsuccessfullyParsedPages = action(
  "UNSUCCESSFULLY_PARSED_PAGES/REMOVE"
);
const SetFactions = action("FACTIONS/SET");
const SetFactionModels = action("FACTION_MODELS/SET");
const SetModel = action("MODEL/SET");

export {
  AddWikiPage,
  FetchWikiPage,
  RemoveUnsuccessfullyParsedPages,
  SetFactions,
  SetFactionModels,
  SetModel,
};
