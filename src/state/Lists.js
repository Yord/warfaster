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
    setCardCortex,
    setCardVehicleWeapon,
    setCardWarjackWeapons,
    setListTitle,
    toggleCard,
    moveCard,
  },
  {},
  { select }
);

export { Lists };

const oneEmptyList = [
  {
    title: "",
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

function addCard(state, { listIndex, pageId }) {
  const lists = select(state);
  const card = { pageId, hidden: true };
  lists[listIndex].cards.push(card);
}

function addEmptyList(state, { listIndex }) {
  const lists = select(state);
  lists.splice(listIndex, 0, oneEmptyList[0]);
}

function removeCard(state, { listIndex, cardIndex }) {
  const lists = select(state);
  lists[listIndex].cards.splice(cardIndex, 1);
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

function moveCard(state, { listIndex, cardIndex, up }) {
  const lists = select(state);
  const list = lists[listIndex];
  const card = list.cards[cardIndex];

  const newCardIndex = cardIndex + (up ? -1 : 1);
  if (newCardIndex >= 0 && newCardIndex < list.cards.length) {
    list.cards.splice(cardIndex, 1);
    list.cards.splice(newCardIndex, 0, card);
  } else if (newCardIndex === -1 && listIndex > 0) {
    const newList = lists[listIndex - 1];
    list.cards.splice(cardIndex, 1);
    newList.cards.push(card);
  } else if (
    newCardIndex === list.cards.length &&
    listIndex < lists.length - 1
  ) {
    const newList = lists[listIndex + 1];
    list.cards.splice(cardIndex, 1);
    newList.cards.splice(0, 0, card);
  }
}

function toggleCard(state, { listIndex, cardIndex, pageId }) {
  const lists = select(state);
  const card = lists[listIndex].cards[cardIndex];
  if (card.pageId === pageId) {
    card.hidden = !card.hidden;
  }
}

function setCardCortex(state, { listIndex, cardIndex, pageId, cortexIds }) {
  const lists = select(state);
  const card = lists[listIndex].cards[cardIndex];

  if (!pageId) {
    delete card.cortexIds;
  } else {
    if (card.pageId === pageId) {
      card.cortexIds = cortexIds;
    }
  }
}

function setCardWarjackWeapons(
  state,
  { listIndex, cardIndex, hardpointNameIndex, pageId, warjackWeaponId }
) {
  const lists = select(state);
  const card = lists[listIndex].cards[cardIndex];
  if (card.pageId === pageId) {
    if (!card.warjackWeaponIds) {
      card.warjackWeaponIds = [];
    }
    if (!warjackWeaponId) {
      delete card.warjackWeaponIds[hardpointNameIndex];
    } else {
      card.warjackWeaponIds[hardpointNameIndex] = warjackWeaponId;
    }
  }
}

function setCardVehicleWeapon(
  state,
  { listIndex, cardIndex, pageId, vehicleWeaponId }
) {
  const lists = select(state);
  const card = lists[listIndex].cards[cardIndex];
  if (card.pageId === pageId) {
    if (!vehicleWeaponId) {
      delete card.vehicleWeaponId;
    } else {
      card.vehicleWeaponId = vehicleWeaponId;
    }
  }
}

// Selectors

function select(state) {
  return state.ui.lists;
}
