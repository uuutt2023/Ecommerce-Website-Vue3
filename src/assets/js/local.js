import store from '@/store';
import { pick, throttle } from 'lodash';

export const prefixLocal = 'WEBAPP-CAT';

/**
 * 实现Vuex的永久性保存
 * 1. 关闭网页时，将Vuex数据存储进浏览器里
 * 2. 启动Vue时，读取相关数据并写入Vuex中
 * @return {Function} 节流函数
 * */
export const vuexDataSaveIntoBrowser = () => {
  window.addEventListener('beforeunload', () => {
    // 保存数据到本地
    const data = pick(store.state, ['userFavorites', 'user']);
    // 将 Vuex 的数据保存到 localStorage
    localStorage.setItem(`${prefixLocal}-DATA`, JSON.stringify(data));
  });

  return throttle(() => {
    // 从浏览器中获取保存的字符串数据
    const savedData = localStorage.getItem(`${prefixLocal}-DATA`);
    savedData && store.commit('loadLocalData', JSON.parse(savedData));
  }, 5000)();
};
