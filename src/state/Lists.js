import { StateShard } from "./utils";

const Lists = StateShard(
  "Lists",
  init,
  { addCard, removeCard, updateCard },
  { select }
);

export { Lists };

function init(state) {
  if (!state.ui) {
    state.ui = {};
  }

  state.ui.lists = [
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
  ];
}

// Actions

function addCard(state, { page }) {
  const lists = select(state);
  lists[lists.length - 1].cards.push(page);
}

function removeCard(state, { source }) {
  const lists = select(state);
  lists[source.listIndex].cards.splice(source.cardIndex, 1);
}

function updateCard(state, { destination, source }) {
  const lists = select(state);
  const card = lists[source.listIndex].cards[source.cardIndex];
  lists[source.listIndex].cards.splice(source.cardIndex, 1);
  lists[destination.listIndex].cards.splice(destination.cardIndex, 0, card);
}

// Selectors

function select(state) {
  return state.ui.lists;
}
