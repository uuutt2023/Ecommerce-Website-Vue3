import { createStore } from 'vuex';
import { compressOneLayerOfObjects } from '@/assets/js/util';

import { fromPairs, set, forEach, assign } from 'lodash';
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
      // 路由配置
      state.mockPath = val;
    },
    setLoading(state, bool) {
      // 加载状态
      state.isLoading = bool;
    },
    setListFavorite(state, listFavorite) {
      // 用户收藏
      state.userFavorites = assign(
        fromPairs([[state.user.username, listFavorite]]),
        state.userFavorites,
      );
    },
    setUserInfo(state, user) {
      // 当前用户
      state.user = user;
    },
    loadLocalData(state, data) {
      // 读取浏览器数据
      forEach(compressOneLayerOfObjects(data), (val, key) => set(state, key, val));
    },
    setTabState(state, num) {
      // 用户主页底部TAB栏状态
      state.tabState = num;
    },
  },

  actions: {
    addUserFavorite({ getters, commit }, favoriteId) {
      commit(
        'setListFavorite',
        // 用户操作：添加收藏
        _(getters.currentUserFavorites ?? [])
          .push(favoriteId)
          .uniq()
          .value(),
      );
    },

    removeUserFavorite({ getters, commit }, favoriteId) {
      commit(
        'setListFavorite',
        // 用户操作：移除收藏
        _(getters.currentUserFavorites ?? [])
          .filter((item) => item != favoriteId)
          .value(),
      );
    },
  },

  getters: {
    // 获取当前登录用户的收藏
    currentUserFavorites: (state) => state.userFavorites[state.user.username],
  },
});

export default store;
