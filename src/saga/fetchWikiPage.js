import {
  actionChannel,
  call,
  delay,
  put,
  select,
  take,
} from "redux-saga/effects";
import { unixMillisNow } from "../utils";
import { wikiPage } from "../store/wikiPage";

const fetchWikiPage = function* () {
  const wikiPageChannel = yield actionChannel("WIKI_PAGE/FETCH");

  while (true) {
    const { payload } = yield take(wikiPageChannel);
    const page = payload.page;
    const data = yield select(wikiPage.get(page));

    const oneDay = 24 * 60 * 60 * 1000;
    if (!data || unixMillisNow() - data.lastVisit > oneDay) {
      const data = yield call(jsonp, wiki(page));
      yield put({ type: "WIKI_PAGE/ADD", payload: { page, data: data.parse } });
      yield delay(2000);
    }
  }
};

export { fetchWikiPage };

function wiki(page) {
  return `https://privateerpress.wiki/api.php?action=parse&page=${page}&formatversion=2&format=json`;
}

function jsonp(url) {
  return new Promise(function (resolve, reject) {
    const callbackName = "jsonp_callback_" + Math.round(100000 * Math.random());
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
