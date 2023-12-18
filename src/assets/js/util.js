/**
 * 获取当前 URL 所有 GET 查询参数
 * 入参：要解析的 URL，不传则默认为当前 URL
 * 返回：一个<key, value>参数对象
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
 * 防抖动函数
 * 入参：需要进行防抖动的函数 Fn
 * 入参：延迟时间 dela，默认为1秒
 * 返回：触发函数，调用即可启动
 */
export const debounce = (fn, delay = 1000) => {
  let time = null;
  return function () {
    time !== null && clearTimeout(time);
    time = setTimeout(() => fn(), delay);
  };
};

/**
 * 节流函数
 * 入参：需要进行节流的函数 Fn
 * 入参：间隔时间 dela，默认为1秒
 * 返回：触发函数，调用即可启动
 */
export const throttle = (fn, delay = 1000) => {
  /**
   * 记录节流函数触发 Last
   * 延迟器返回的 Time
   * 记录当前函数触发 Now
   * */
  let last, time, now;

  function _throttle() {
    now = Date.now();
    if (last && now - last < delay) {
      clearTimeout(time);
      time = setTimeout(() => {
        last = now;
        fn.call(this, ...arguments);
      }, delay);
    } else {
      last = now;
      fn.call(this, ...arguments);
    }
  }

  return _throttle;
};
