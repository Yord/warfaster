import { StateShard } from "./utils";

const Lists = StateShard(
  "Lists",
  init,
  {
    addCard,
    addEmptyList,
    moveListBy,
    removeCard,
    removeList,
    setListTitle,
    toggleCard,
    updateCard,
  },
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

function addEmptyList(state, { listIndex }) {
  const lists = select(state);
  const emptyList = {
    title: "Empty list",
    cards: [],
  };
  lists.splice(listIndex, 0, emptyList);
}

function removeCard(state, { source }) {
  const lists = select(state);
  lists[source.listIndex].cards.splice(source.cardIndex, 1);
}

function removeList(state, { listIndex }) {
  const lists = select(state);
  lists.splice(listIndex, 1);
  if (lists.length === 0) {
    addEmptyList(state, { listIndex: 0 });
  }
}

function moveListBy(state, { listIndex, by }) {
  const lists = select(state);
  if (
    (by > 0 && listIndex + by < lists.length) ||
    (by < 0 && listIndex + by >= 0)
  ) {
    const list = lists[listIndex];
    lists.splice(listIndex, 1);
    lists.splice(listIndex + by, 0, list);
  }
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
