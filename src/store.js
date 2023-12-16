import { createStore } from 'vuex';

const store = createStore({
  state: {
    mockPath: [],
  },
  mutations: {
    mockPath(state, val) {
      state.mockPath = val;
    },
  },

  actions: {
    setMockPath({ commit }, fn) {
      commit('mockPath', fn);
    },
  },
});

export default store;
