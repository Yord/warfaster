import { StateShard } from "./utils";

const ParserNames = StateShard(
  "ParserNames",
  init,
  { setForPage },
  {},
  { selectByPage }
);

export { ParserNames };

function init(state) {
  if (!state.data) {
    state.data = {};
  }

  state.data.parserNames = {};
}

// Actions

function setForPage(state, { page, parserName }) {
  const parserNames = select(state);
  parserNames[page] = parserName;
}

// Selectors

function select(state) {
  return state.data.parserNames;
}

function selectByPage(state, page) {
  const parserNames = select(state);
  return parserNames[page];
}
