const models = {
  set: (page, model) => (state) => {
    state.data.models[page] = model;
  },
  selectAll: (state) => state.data.models,
};

export { models };
