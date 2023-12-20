import _ from 'lodash';
import store from '@/store';

/**
 * 获取当前 URL 所有 GET 查询参数
 * @param {String} url 要解析的 URL，不传则默认为当前 URL
 * @return {Object<key, value>} 一个<key, value>参数对象
 */
export const getUrlQueryParams = (url = location.search) =>
  url
    .substring(url.indexOf('?') + 1)
    .split('&')
    .reduce((obj, param) => {
      const [key, value] = param.split('=');
      obj[key] = decodeURIComponent(value);
      return obj;
    }, {});

/**
 * 多层对象展开
 * @param {Object} data 两层及以上的对象
 * @return {Object} 展开后的一层对象
 * */

export const compressOneLayerOfObjects = (data) =>
  Object.assign(
    ..._.flatMapDeep(data, (value, key) =>
      _.isObject(value) ? _.mapKeys(value, (innerValue, innerKey) => `${key}.${innerKey}`) : key,
    ),
  );

/**
 * 实现Vuex的永久性保存
 * 1. 关闭网页时，将Vuex数据存储进浏览器里
 * 2. 启动Vue时，读取相关数据并写入Vuex中
 * @return {Function} 节流函数
 * */
export const vuexDataSaveIntoBrowser = () => {
  window.addEventListener('beforeunload', () => {
    const data = _.pick(store.state, ['userFavorites', 'user']);
    // 将 Vuex 的数据保存到 localStorage
    localStorage.setItem('webApp-Cat-vuexData', JSON.stringify(data));
  });
  return _.throttle(() => {
    // 从浏览器中获取保存的字符串数据
    const savedData = localStorage.getItem('webApp-Cat-vuexData');
    savedData && store.commit('setData', JSON.parse(savedData));
  }, 5000)();
};
