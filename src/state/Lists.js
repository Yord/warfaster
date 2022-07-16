import { StateShard } from "./utils";

const Lists = StateShard(
  "Lists",
  init,
  { addCard, removeCard, setListTitle, toggleCard, updateCard },
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
        { page: "Vassal_Raiders", hidden: true },
        { page: "Grafter", hidden: true },
        { page: "Hierotheos_Raxis", hidden: true },
        { page: "Aenigma", hidden: true },
        { page: "Nemesis", hidden: true },
        { page: "Cacophonic_Declination", hidden: true },
        { page: "Relikon", hidden: true },
        { page: "Defense_Pylon", hidden: true },
      ],
    },
    {
      title: "My fancy cyphers list",
      cards: [
        { page: "Acheronian_Venediction", hidden: true },
        { page: "Aggression_Theorem", hidden: true },
        { page: "Annihilation_Vector", hidden: true },
        { page: "Arcane_Synthesis", hidden: true },
        { page: "Arcanesscent_Regenerator", hidden: true },
        { page: "Ascension_Catalyst", hidden: true },
        { page: "Atrophic_Decomposer", hidden: true },
        { page: "Cacophonic_Declination", hidden: true },
      ],
    },
  ];
}

// Actions

function setListTitle(state, { listIndex, title }) {
  const lists = select(state);
  lists[listIndex].title = title;
}

function addCard(state, { page }) {
  const lists = select(state);
  const card = { page, hidden: true };
  lists[lists.length - 1].cards.push(card);
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

function toggleCard(state, { listIndex, cardIndex, page }) {
  console.log(listIndex, cardIndex, page);
  const lists = select(state);
  const card = lists[listIndex].cards[cardIndex];
  if (card.page === page) {
    card.hidden = !card.hidden;
  }
}

// Selectors

function select(state) {
  return state.ui.lists;
}
