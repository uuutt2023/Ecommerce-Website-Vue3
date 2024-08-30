import { createRouter, useRoute } from 'vue-router';
import store from '@/store/store';
import _isEmpty from 'lodash/isEmpty';
import _eq from 'lodash/eq';

const Web = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    name: 'index',
    redirect: '/index/signIn',
    component: () => import('@/views/index/WebIndex.vue'),
    children: [
      {
        path: 'signIn',
        name: 'signIn',
        component: () => import('@/views/index/components/SignIn.vue'),
        meta: { title: '登录' },
      },
      {
        path: 'signUp',
        name: 'signUp',
        component: () => import('@/views/index/components/SignUp.vue'),
        meta: { title: '注册' },
      },
      {
        path: 'changePwd',
        name: 'changePwd',
        component: () => import('@/views/index/components/ChangePwd.vue'),
        meta: { title: '重置密码' },
      },
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/admin/WebAdmin.vue'),
    meta: { title: '后台管理', reqPermissions: 'admin' },
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user/WebUser.vue'),
    meta: { reqPermissions: 'user' },
    redirect: '/user/home',
    children: [
      {
        path: 'home/detail',
        name: 'detail',
        component: () => import('@/views/user/components/DetailHome.vue'),
        meta: { title: '详情页', noBottomBar: true, saveTabState: true },
      },
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/user/components/UserHome.vue'),
        meta: { title: '主页', tabState: 0 },
      },
      {
        path: 'categories',
        name: 'categories',
        component: () => import('@/views/user/components/UserCategories.vue'),
        meta: { title: '分类', tabState: 1 },
      },
      {
        path: 'categories/detail',
        name: 'categoriesDetail',
        component: () => import('@/views/user/components/DetailCategories.vue'),
        meta: { title: '品种介绍', noBottomBar: true, saveTabState: true },
      },
      {
        path: 'favorites',
        name: 'favorites',
        component: () => import('@/views/user/components/UserFavorites.vue'),
        meta: { title: '收藏', tabState: 2 },
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/user/components/UserProfile.vue'),
        meta: { title: '个人页面', tabState: 3 },
      },
    ],
  },
];

const router = createRouter({
  // history: createWebHistory(),
  routes: [...Web],
});

router.beforeEach(
  /**
   * 路由跳转 - 权限判断
   * @param {Object} to 目标地址
   * @param {Object} to.meta 目标数据
   * @param from
   * @param next
   * */
  function (to, from, next) {
    const requiredPermissions = to.meta.reqPermissions; // 路由配置中定义的所需权限
    const userPermissions = store.state.user.permissions; // 从 Vuex 中获取用户权限
    // 路由没有配置权限
    if (_isEmpty(requiredPermissions)) {
      next();
      return;
    }
    // 检查用户是否具有所需权限
    const hasPermission = _eq(requiredPermissions, userPermissions);
    if (hasPermission) {
      // 用户具有所需权限，允许访问路由
      next();
    } else {
      // 用户没有所需权限，重定向到其他页面或显示提示信息
      next('/index/signIn?show=2');
    }
  },
);

router.beforeEach(function (to, from, next) {
  const { title } = to.meta;
  // 标题修改
  document.title = title ?? '';
  // 取消动画
  store.commit('setLoading', false);
  next();
});

export default router;

export const getRoute = () => useRoute();
