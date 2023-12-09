/*
 * @Author: uuutt 584193570@qq.com
 * @Date: 2023-12-09 18:40:57
 * @LastEditors: uuutt 584193570@qq.com
 * @LastEditTime: 2023-12-09 22:01:48
 * @FilePath: \vue3-data-pulse\src\router\index.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */

import { createRouter, createWebHistory } from 'vue-router';

const index = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('@/views/Index/WebIndex.vue'),
    meta: { title: '登录界面' },
    children: [
      {
        path: 'signIn',
        name: 'signIn',
        component: () => import('@/views/Index/components/SignIn.vue'),
      },
      {
        path: 'signUp',
        name: 'signUp',
        component: () => import('@/views/Index/components/SignUp.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: [...index],
});

export default router;
