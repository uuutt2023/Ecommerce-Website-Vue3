import { createStore } from 'vuex';
import { compressOneLayerOfObjects } from '@/assets/js/util';

import { fromPairs, set, forEach } from 'lodash';

const store = createStore({
  state: {
    mockPath: [],
    isLoading: false,
    userFavorites: {},
    user: {
      username: '',
      permissions: '',
    },
  },
  mutations: {
    setMockPath(state, val) {
      state.mockPath = val;
    },
    setLoading(state, bool) {
      state.isLoading = bool;
    },
    setListFavorite(state, listFavorite) {
      state.userFavorites = listFavorite;
    },
    setUserInfo(state, user) {
      state.user = user;
    },
    loadLocalData(state, data) {
      forEach(compressOneLayerOfObjects(data), (val, key) => set(state, key, val));
    },
  },

  actions: {
    addUserFavorite({ state, commit }, favoriteId) {
      const { username } = state.user;
      let list = state.userFavorites[username] ?? [];
      list.push(favoriteId);
      commit('setListFavorite', fromPairs([[username, list]]));
    },
  },
});

export default store;
