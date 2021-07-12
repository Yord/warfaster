const action = (type) => (payload) => ({ type, payload });

const AddWikiPage = action("WIKI_PAGE/ADD");
const FetchWikiPage = action("WIKI_PAGE/FETCH");
const SetFactions = action("FACTIONS/SET");

export { AddWikiPage, FetchWikiPage, SetFactions };
