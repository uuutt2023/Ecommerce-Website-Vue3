import { createStore } from 'vuex';
import { compressOneLayerOfObjects } from '@/assets/js/util';
import _fromPairs from 'lodash/fromPairs';
import _set from 'lodash/set';
import _foreach from 'lodash/forEach';

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
    setData(state, data) {
      _foreach(compressOneLayerOfObjects(data), (val, key) => _set(state, key, val));
    },
  },

  actions: {
    addUserFavorite({ state, commit }, favoriteId) {
      const { username } = state.user;
      let list = state.userFavorites[username] ?? [];
      list.push(favoriteId);
      commit('setListFavorite', _fromPairs([[username, list]]));
    },
  },
});

export default store;
