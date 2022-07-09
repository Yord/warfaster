import { ReduxGroup } from "./utils";

const Lists = ReduxGroup(
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
  state.ui.lists[state.ui.lists.length - 1].cards.push(page);
}

function removeCard(state, { source }) {
  state.ui.lists[source.listIndex].cards.splice(source.cardIndex, 1);
}

function updateCard(state, { destination, source }) {
  const card = state.ui.lists[source.listIndex].cards[source.cardIndex];
  state.ui.lists[source.listIndex].cards.splice(source.cardIndex, 1);
  state.ui.lists[destination.listIndex].cards.splice(
    destination.cardIndex,
    0,
    card
  );
}

// Selectors

function select(state) {
  return state.ui.lists;
}
