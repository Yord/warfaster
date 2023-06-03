import { Requests } from "../../../state/io/Requests";

function* fetchCadreCategoryMembers() {
  yield* Requests.queryCadres();
}

export { fetchCadreCategoryMembers };
