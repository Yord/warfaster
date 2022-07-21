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
    set,
    setListTitle,
    toggleCard,
    updateCard,
  },
  { select }
);

export { Lists };

const oneEmptyList = [
  {
    title: "Empty",
    cards: [],
  },
];

function init(state) {
  if (!state.ui) {
    state.ui = {};
  }

  state.ui.lists = oneEmptyList;
}

// Actions

function set(state, { lists }) {
  state.ui.lists = lists.length > 0 ? lists : oneEmptyList;
}

function setListTitle(state, { listIndex, title }) {
  const lists = select(state);
  lists[listIndex].title = title;
}

function addCard(state, { pageId }) {
  const lists = select(state);
  const card = { pageId, hidden: true };
  lists[0].cards.push(card);
}

function addEmptyList(state, { listIndex }) {
  const lists = select(state);
  lists.splice(listIndex, 0, oneEmptyList[0]);
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

function toggleCard(state, { listIndex, cardIndex, pageId }) {
  const lists = select(state);
  const card = lists[listIndex].cards[cardIndex];
  if (card.pageId === pageId) {
    card.hidden = !card.hidden;
  }
}

// Selectors

function select(state) {
  return state.ui.lists;
}
