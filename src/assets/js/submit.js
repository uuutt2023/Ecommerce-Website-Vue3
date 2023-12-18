import store from '@/store';
import axios from 'axios';
import router from '@/router';

/**
 * Post 请求封装
 * @param {String} url 请求API地址
 * @param {Object} data 请求附带Json数据
 * @param {Function} callback 请求成功后回调方法
 * */
const submitPost = async ({ url, data }, callback) => {
  // 加载动画显示
  await store.dispatch('setLoading', true);
  const resp = await axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  callback(resp);
  await store.dispatch('setLoading', false);
};

/**
 * 登录事件处理
 * */
export async function onSignIn(values, actions) {
  const options = {
    url: '/api/user/signIn',
    data: { username: values.act, password: values.pwd },
  };
  await submitPost(options, ({ data }) => {
    if (data.result === 'error') {
      actions.setErrors({
        act: '用户名或密码错误',
        pwd: '用户名或密码错误',
      });
    } else {
      // 跳转首页
      router.push(`/${data.data.roles}`);
    }
  });
}

/**
 * 忘记密码事件处理
 * */
export async function changePwd(values, actions) {
  const options = {
    url: '/api/user/changePwd',
    data: {
      username: values.act,
      password: values.pwd1,
    },
  };
  await submitPost(options, ({ data }) => {
    if (data.result === 'error') {
      actions.setErrors({
        act: '账号不存在',
      });
    } else {
      // 修改成功，跳转到登录页面
      router.push('/index/signIn?show=1');
    }
  });
}

export async function onSignUp(values, actions) {
  const options = {
    url: '/api/user/signUp',
    data: {
      username: values.act,
      password: values.pwd1,
    },
  };
  await submitPost(options, ({ data }) => {
    if (data.result === 'error') {
      actions.setErrors({
        act: '该账号已注册，请重新输入',
      });
    } else {
      // 跳转首页
      router.push('/index/signIn?show=0');
    }
  });
}
