import { createStore } from 'vuex';
import { compressOneLayerOfObjects } from '@/assets/js/util';

import { fromPairs, set, forEach } from 'lodash';
import _ from 'lodash';

const store = createStore({
  state: {
    mockPath: [],
    isLoading: false,
    userFavorites: {},
    user: {
      username: '',
      permissions: '',
    },
    tabState: 0,
  },
  mutations: {
    setMockPath(state, val) {
      state.mockPath = val;
    },
    setLoading(state, bool) {
      state.isLoading = bool;
    },
    setListFavorite(state, listFavorite) {
      state.userFavorites = fromPairs([[state.user.username, listFavorite]]);
    },
    setUserInfo(state, user) {
      state.user = user;
    },
    loadLocalData(state, data) {
      console.log(compressOneLayerOfObjects(data));
      forEach(compressOneLayerOfObjects(data), (val, key) => set(state, key, val));
    },
    setTabState(state, num) {
      state.tabState = num;
    },
  },

  actions: {
    addUserFavorite({ getters, commit }, favoriteId) {
      commit(
        'setListFavorite',
        _(getters.currentUserFavorites ?? [])
          .push(favoriteId)
          .uniq()
          .value(),
      );
    },

    removeUserFavorite({ getters, commit }, favoriteId) {
      commit(
        'setListFavorite',
        _(getters.currentUserFavorites ?? [])
          .filter((item) => item != favoriteId)
          .value(),
      );
    },
  },

  getters: {
    currentUserFavorites: (state) => state.userFavorites[state.user.username],
  },
});

export default store;
