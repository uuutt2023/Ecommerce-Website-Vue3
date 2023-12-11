import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// BootStrap 5
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

createApp(App).use(router).mount('#app');
