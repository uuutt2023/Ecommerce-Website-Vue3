import { createRouter, createWebHistory, useRoute } from 'vue-router';
import store from '@/store';

const index = [
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
    meta: { title: '后台管理' },
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user/WebUser.vue'),
    meta: { title: '首页' },
    redirect: '/user/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/user/components/UserHome.vue'),
        meta: { title: '猫猫主页' },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: [...index],
});

// 路由跳转 - 修改标题，撤销加载动画
router.beforeEach((to, from, next) => {
  if (to.meta?.title && to.meta.title) {
    document.title = to.meta.title;
  }
  // 取消动画
  store.dispatch('setLoading', false).then(() => next());
});

export default router;

export const getRoute = () => useRoute();
