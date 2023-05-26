import { call, put, select } from "redux-saga/effects";
import { CadreCategoryMembers } from "../../../state/CadreCategoryMembers";
import { jsonp } from "../jsonp";

function* fetchCadreCategoryMembers() {
  const data = yield select(CadreCategoryMembers.select());
  if (Object.keys(data).length === 0) {
    const data = yield call(jsonp, fetchMembers());
    if (data.batchcomplete && data.query) {
      const categorymembers = data.query.categorymembers;
      if (categorymembers) {
        const cadreCategoryMembers = Object.fromEntries(
          categorymembers.map((member) => [
            member.pageid,
            member.title.replace(/^Category:/, ""),
          ])
        );

        yield put(CadreCategoryMembers.set({ cadreCategoryMembers }));
      }
    }
  }
}

export { fetchCadreCategoryMembers };

function fetchMembers() {
  return `https://privateerpress.wiki/api.php?action=query&formatversion=2&format=json&list=categorymembers&cmtitle=Category:Cadre&cmtype=subcat&cmlimit=max`;
}
