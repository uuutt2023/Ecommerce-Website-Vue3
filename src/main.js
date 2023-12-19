import { createApp } from 'vue';
import App from './App.vue';

// Vue 路由
import router from './router';
// VueX
import store from './store';
// Mock.js 模拟数据接口
import '@/mock/index';

// BootStrap 5
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
// 动画库
import 'animate.css';
// 图标库
import '@/assets/icon/iconfont.css';
// 国际化整合
import { i18n } from '@/i18n';
// 瀑布流布局
import { VueMasonryPlugin } from 'vue-masonry';

let app = createApp(App);
app.use(i18n);
app.use(store);
app.use(router);
app.use(VueMasonryPlugin);
app.mount('#app');
