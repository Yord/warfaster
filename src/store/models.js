const models = {
  set: (models) => (state) => {
    state.models = models;
  },
  select: (state) => state.models,
};

export { models };
