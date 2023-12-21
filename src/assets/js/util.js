import { flatMapDeep, isObject, mapKeys, indexOf } from 'lodash';
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
    ...flatMapDeep(data, (value, key) =>
      isObject(value) ? mapKeys(value, (_innerValue, innerKey) => `${key}.${innerKey}`) : key,
    ),
  );

import router from '@/router';

/**
 * 点击跳转详情页
 * @param {number} id
 */
export function jumpToDetail(url, id) {
  router.push(`${url}?id=${id}`);
}

/**
 * 重复对象插入特定key值
 * @param {Object} list 原对象
 * @return {Object} 标识重复的对象数组（对象内插入新值isActive
 */
export function checkValueInterpolation(list) {
  const current = [...(store.getters.currentUserFavorites ?? [])];
  if (current) {
    const _ = require('lodash'),
      filterList = _(list)
        .filter(({ id }) => indexOf(current, id) != -1)
        .map((item) => ({ ...item, isActive: true }))
        .value();
    return _.assign(list, filterList);
  }
  return list;
}
