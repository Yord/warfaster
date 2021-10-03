import { dispatch, init } from "./objects";

const state = init({
  data: {
    factions: {},
    factionModels: {},
    wildCardModels: {},
    models: {},
    cypherCodecs: [],
    cyphers: {},
  },
  ui: {
    dragging: false,
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
});

export { dispatch, state };
