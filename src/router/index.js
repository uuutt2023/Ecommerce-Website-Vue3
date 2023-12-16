import { createRouter, createWebHistory } from 'vue-router';

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
        path: 'forge',
        name: 'forge',
        component: () => import('@/views/index/components/ForgePwd.vue'),
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
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: [...index],
});

// 路由跳转 - 修改标题
router.beforeEach((to, from, next) => {
  if (to.meta?.title && to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
