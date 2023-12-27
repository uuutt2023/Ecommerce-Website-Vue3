import { createStore } from 'vuex';
import { flattenObjet } from '@/assets/js/util';

import { set, forEach, uniq, isEqual } from 'lodash';

const store = createStore({
  state: {
    mockPath: [],
    isLoading: false,
    userFavorites: {},
    user: {
      avatar: '',
      name: '',
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
      state.userFavorites[state.user.username] = listFavorite;
    },
    setUserInfo(state, user) {
      // 当前用户
      state.user = user;
    },
    loadLocalData(state, data) {
      // 读取浏览器数据
      forEach(flattenObjet(data), (val, key) => set(state, key, val));
    },
    setTabState(state, num) {
      // 用户主页底部TAB栏状态
      state.tabState = num;
    },
  },

  actions: {
    addUserFavorite({ getters, commit }, favoriteId) {
      const user = getters.currentUserFavorites ?? [];
      user.push(favoriteId);
      commit('setListFavorite', uniq(user));
    },

    removeUserFavorite({ getters, commit }, favoriteId) {
      const user = getters.currentUserFavorites ?? [];
      const filter = user.filter((item) => !isEqual(item, favoriteId));
      commit('setListFavorite', filter);
    },
  },

  getters: {
    // 获取当前登录用户的收藏
    currentUserFavorites: (state) => state.userFavorites[state.user.username],
    // 当前用户的头像
    currentUserAvatar: (state) =>
      require(
        `@/assets/images/${
          state.user.avatar ? `avatar/${state.user.avatar}.jpg` : 'user/Oval.png'
        }`,
      ),
  },
});

export default store;
