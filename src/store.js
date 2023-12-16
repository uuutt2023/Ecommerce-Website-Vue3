import { createStore } from 'vuex';

const store = createStore({
  state: {
    mockPath: [],
    isLoading: false,
  },
  mutations: {
    mockPath(state, val) {
      state.mockPath = val;
    },
    isLoading(state, bool) {
      state.isLoading = bool;
    },
  },

  actions: {
    setMockPath({ commit }, fn) {
      commit('mockPath', fn);
    },
    setLoading({ commit }, bool) {
      commit('isLoading', bool);
    },
  },
});

export default store;
