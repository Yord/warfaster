import produce from "immer";

const identity = (a) => a;

const pipe =
  (...fs) =>
  (a) => {
    for (const f of fs) {
      a = f(a);
    }
    return a;
  };

const initAll = (...objects) =>
  pipe(...objects.map((obj) => produce(obj.init)));

const immer = (f) => (state, action) => produce(f(action) || identity)(state);

const ReduxGroup = (namespace, init, actions, selectors) => ({
  init,
  dispatch: Object.fromEntries(
    Object.entries(actions).map(([type, f]) => [namespace + "." + type, f])
  ),
  ...Object.fromEntries(
    Object.entries(actions).map(([type, f]) => [
      f.name,
      (payload = {}) => ({ type: namespace + "." + type, payload }),
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

export { ReduxGroup, immer, initAll };
