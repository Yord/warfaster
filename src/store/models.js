const models = {
  set: (page, model) => (state) => {
    state.models[page] = model;
  },
  selectAll: (state) => state.models,
};

export { models };
