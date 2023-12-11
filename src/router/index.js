import { createRouter, createWebHistory } from 'vue-router';
import { defineAsyncComponent } from 'vue';

const index = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('@/views/Index/WebIndex.vue'),
    redirect: '/index/signIn',
    meta: { title: '登录界面' },
    children: [
      {
        path: 'signIn',
        name: 'signIn',
        component: () => defineAsyncComponent(() => import('@/views/Index/components/SignIn.vue')),
      },
      {
        path: 'signUp',
        name: 'signUp',
        component: () => defineAsyncComponent(() => import('@/views/Index/components/SignUp.vue')),
      },
      {
        path: 'forge',
        name: 'forge',
        component: () => defineAsyncComponent(() => import('@/views/Index/components/ForgePwd.vue')),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: [...index],
});

export default router;
