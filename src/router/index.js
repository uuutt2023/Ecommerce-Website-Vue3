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
    component: () => import('@/views/Index/WebIndex.vue'),
    children: [
      {
        path: 'signIn',
        name: 'signIn',
        component: () => import('@/views/Index/components/SignIn.vue'),
        meta: { title: '登录', keepAlive: true },
      },
      {
        path: 'signUp',
        name: 'signUp',
        component: () => import('@/views/Index/components/SignUp.vue'),
        meta: { title: '注册' },
      },
      {
        path: 'forge',
        name: 'forge',
        component: () => import('@/views/Index/components/ForgePwd.vue'),
        meta: { title: '重置密码' },
      },
    ],
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
