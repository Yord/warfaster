import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { root } from "./state";

const initStore = (saga) => {
  const initialState = {
    data: {
      pages: {},
      factions: {},
      factionModels: {},
      models: {},
      cypherCodecs: [],
      cyphers: {},
    },
    ui: {
      menuCollapsed: false,
      lists: [
        {
          title: "My fancy models list",
          cards: [
            "Vassal_Raiders",
            "Grafter",
            "Hierotheos_Raxis",
            "Aenigma",
            "Nemesis",
            "Cacophonic_Declination",
            "Relikon",
            "Defense_Pylon",
          ],
        },
        {
          title: "My fancy cyphers list",
          cards: [
            "Acheronian_Venediction",
            "Aggression_Theorem",
            "Annihilation_Vector",
            "Arcane_Synthesis",
            "Arcanesscent_Regenerator",
            "Ascension_Catalyst",
            "Atrophic_Decomposer",
            "Cacophonic_Declination",
          ],
        },
      ],
    },
  };

  const persistedState = localStorage.getItem("reduxState")
    ? JSON.parse(localStorage.getItem("reduxState"))
    : initialState;

  const composedEnhancers = composeWithDevTools(applyMiddleware(saga));
  const store = createStore(root, persistedState, composedEnhancers);

  store.subscribe(() => {
    localStorage.setItem("reduxState", JSON.stringify(store.getState()));
  });

  return store;
};

export { initStore };
