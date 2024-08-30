import { assign, indexOf, isArray, isObject, transform } from 'lodash';
import store from '@/store/store';
import router from '@/router';

/**
 * 获取当前 URL 所有 GET 查询参数
 * @param {String} url 要解析的 URL，不传则默认为当前 URL
 * @return {Object<key, value>} 一个<key, value>参数对象
 */
export const getUrlQueryParams = (url = location.hash.split('?').pop()) =>
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
 * @return {Array} 展开后的一层对象
 * */
export const flattenObjet = (data) => {
  // console.log(data);
  return transform(
    data,
    (result, value, key) => (result[key] = isObject(value) ? flattenObjet(value) : value),
  );
};

/**
 * 点击跳转详情页
 * @param url
 * @param {number | String} id
 */
export async function jumpToDetail(url, id) {
  await router.push(`${url}?id=${id}`);
}

/**
 * 重复对象插入特定key值
 * @param {Object|Array} list 原对象
 * @return {Object|boolean} 如果传入的不是数组，则返回判断结果
 * @example
 * // 传入对象数组，遍历判断所有对象是否满足条件
 * // => [{isActive: ?, ...}]
 * checkValueInterpolation([{...}]);
 *
 * // 传入对象，单独返回布尔值
 * // => true / false
 * checkValueInterpolation({...});
 */
export function checkValueInterpolation(list) {
  // Vuex 中存储的用户收藏数据
  const current = store.getters.currentUserFavorites ?? [];

  if (isArray(list)) {
    if (current.length > 0) {
      const _ = require('lodash'),
        filterList = _(list)
          .filter(({ id }) => indexOf(current, id) !== -1)
          .map((item) => ({ ...item, isActive: true }))
          .value();
      return assign(list, filterList);
    }
    return list;
  }

  if (isObject(list)) {
    return indexOf(current, list?.id) !== -1;
  }

  return { ...list, isActive: false };
}

/**
 * 点击爱心收藏
 * @param {Object} card 卡片对象
 * */
export function toggleFavorite(card) {
  // 提交收藏状态到Vuex中
  store.dispatch(card.isActive ? 'removeUserFavorite' : 'addUserFavorite', card.id).then(() => {
    card.isActive = !card.isActive;
  });
}

/**
 * 中文哈希值
 * @param {String} str 输入中文字符串
 * @return {Number} 返回唯一ID
 * */
export function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash += str.charCodeAt(i);
  }
  return hash % 10000; // 取模以得到4位数的唯一ID
}
