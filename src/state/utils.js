import produce from "immer";

const initAll = (...objects) =>
  pipe(...objects.map((obj) => produce(obj.init)));

const immer = (f) => (state, action) => produce(f(action) || identity)(state);

const StateShard = (namespace, init, actions, selectors) => ({
  namespace,
  init,
  dispatch: Object.fromEntries(
    Object.entries(actions).map(([functionName, f]) => [
      namespace + "." + functionName,
      f,
    ])
  ),
  ...Object.fromEntries(
    Object.keys(actions).map((functionName) => [
      functionName,
      (payload = {}) => ({ type: namespace + "." + functionName, payload }),
    ])
  ),
  ...Object.fromEntries(
    Object.entries(selectors).map(([name, f]) => [
      name,
      (...args) =>
        (state) =>
          f(state, ...args),
    ])
  ),
});

export { StateShard, immer, initAll };

function identity(a) {
  return a;
}

function pipe(...fs) {
  return (a) => {
    for (const f of fs) {
      a = f(a);
    }
    return a;
  };
}
