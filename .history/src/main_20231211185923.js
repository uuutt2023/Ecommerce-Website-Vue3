/*
 * @Author: uuutt 584193570@qq.com
 * @Date: 2023-12-09 18:40:31
 * @LastEditors: uuutt 584193570@qq.com
 * @LastEditTime: 2023-12-09 19:40:28
 * @FilePath: \vue3-data-pulse\src\main.js
 * @Description:
 *  Vue 根入口，可配置前端框架等
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// rem 适配
import 'amfe-flexible'

createApp(App).use(router).mount('#app');
