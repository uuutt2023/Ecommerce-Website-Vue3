import { flatMapDeep, isObject, mapKeys } from 'lodash';

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
