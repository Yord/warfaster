import { all, call, put, select, take } from "redux-saga/effects";
import { unixMillisNow } from "../utils";
import { parseFactions } from "./parsers/factions";

const fetchWikiPage = function* (page) {
  const getWikiPage = (page) => (state) => state.pages[page];
  const data = yield select(getWikiPage(page));

  const oneDay = 24 * 60 * 60 * 1000;
  if (!data || unixMillisNow() - data.lastVisit > oneDay) {
    const wiki = (page) =>
      `https://privateerpress.wiki/api.php?action=parse&page=${page}&formatversion=2&format=json`;
    const data = yield call(jsonp, wiki(page));
    yield put({ type: "WIKI_PAGE/ADD", payload: { page, data: data.parse } });
  }

  function jsonp(url) {
    return new Promise(function (resolve, reject) {
      const callbackName =
        "jsonp_callback_" + Math.round(100000 * Math.random());
      window[callbackName] = function (data) {
        delete window[callbackName];
        document.body.removeChild(script);
        resolve(data);
      };

      const script = document.createElement("script");
      script.src =
        url + (url.indexOf("?") >= 0 ? "&" : "?") + "callback=" + callbackName;
      document.body.appendChild(script);
    });
  }
};

const parseWikiPages = function* () {
  while (true) {
    const action = yield take("WIKI_PAGE/ADD");
    switch (action.payload.page) {
      case "Warcaster":
        const factions = parseFactions(action.payload.data.text);
        yield put({ type: "FACTIONS/SET", payload: { factions } });
        break;
      default:
        break;
    }
  }
};

const root = function* () {
  yield all([fetchWikiPage("Warcaster"), parseWikiPages()]);
};

export { root };
