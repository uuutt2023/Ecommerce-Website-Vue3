import { createApp } from 'vue';
import App from './App.vue';

// Vue 路由
import router from './router';

// BootStrap 5
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

// 国际化整合
import i18n from '@/i18n';

let app = createApp(App);

app.use(i18n).use(router).mount('#app');
