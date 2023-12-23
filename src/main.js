import { createApp } from 'vue';
import App from './App.vue';

import router from './router'; // Vue 路由
import store from './store/store'; // VueX
import '@/mock/index'; // Mock.js 模拟数据接口
import { VueCookieNext } from 'vue-cookie-next'; // Cookies 库
import { i18n } from '@/lang/i18n'; // 国际化整合

// BootStrap 5
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
// 动画库
import 'animate.css';
// 图标库
import '@/assets/icon/iconfont.css';
// 瀑布流布局
import { VueMasonryPlugin } from 'vue-masonry';

// 三天后过期
VueCookieNext.config({ expire: '3d' });

let app = createApp(App);
app.use(i18n);
app.use(store);
app.use(router);
app.use(VueCookieNext);
app.use(VueMasonryPlugin);
app.mount('#app');
