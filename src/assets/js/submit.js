import store from '@/store';
import axios from 'axios';

/**
 * Post 请求封装
 * @param {String} url 请求API地址
 * @param {Object} data 请求附带Json数据
 * @param {Function} todo 请求成功后回调方法
 * */
export const submitPost = (url, data, todo) => {
  // 加载动画显示
  store.dispatch('setLoading', true).then(() =>
    axios
      .post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((resp) => {
        todo(resp);
      }),
  );
};
