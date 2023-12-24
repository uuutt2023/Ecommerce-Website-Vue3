/* eslint-disable no-unused-vars */
import { createStore } from 'vuex';

import { assign, concat, filter, flow, uniq } from 'lodash';

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
      const { user, userFavorites } = state;
      state.userFavorites = flow(
        (favorites) => [...favorites, ...listFavorite], // 解构整合：当前用户收藏数据、新增数据
        uniq, // 去重
        (newFavorites) => assign({ [user.username]: newFavorites }), // 添加用户名Key
        (updatedFavorites) => assign(userFavorites, updatedFavorites), // 合并数据
      )(userFavorites[user.username] || []);
    },
    setUserInfo(state, user) {
      // 当前用户
      state.user = user;
    },
    loadLocalData(state, data) {
      assign(state, data);
    },
    setTabState(state, num) {
      // 用户主页底部TAB栏状态
      state.tabState = num;
    },
  },

  actions: {
    addUserFavorite({ getters, commit }, favoriteId) {
      commit('setListFavorite', flow(concat, uniq)(getters.currentUserFavorites ?? [], favoriteId));
    },

    removeUserFavorite({ getters, commit }, favoriteId) {
      commit(
        'setListFavorite',
        // 用户操作：移除收藏
        filter(getters.currentUserFavorites ?? [], (item) => item !== favoriteId),
      );
    },
  },

  getters: {
    // 获取当前登录用户的收藏
    currentUserFavorites: (state) => [...state.userFavorites[state.user.username]],
  },
});

export default store;
