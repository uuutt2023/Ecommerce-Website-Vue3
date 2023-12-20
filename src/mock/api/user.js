import userJson from '@/mock/node/userInfo.json';
import axios from 'axios';
import { find, isEqual, isEmpty } from 'lodash';

export const GetAll = [{ name: 'userInfo', url: '/api/user', path: '/api/user' }];

export const ChangePwd = [
  {
    name: 'changePwd',
    type: 'post',
    url: '/api/user/changePwd',
    path: '/api/user/changePwd',
    todo: async (req) => {
      const { username, password } = JSON.parse(req?.body);
      // 判断账号是否存在
      let hasAccount = find(userJson.data.userinfo, (user) => isEqual(user.username, username));
      if (hasAccount) {
        hasAccount.password = password;
        userJson.data.userinfo[username] = hasAccount;
        await axios.put('/api/user', userJson);
      }
      return {
        result: !isEmpty(hasAccount) ? 'success' : 'error',
      };
    },
  },
];

/**
 * 注册 mock
 * */
export const SignUp = [
  {
    name: 'signUp',
    type: 'post',
    url: '/api/user/signUp',
    path: '/api/user/signUp',
    todo: async (req) => {
      const { username } = JSON.parse(req?.body);
      // 避免重复注册
      const isSignUp = find(userJson.data.userinfo, (user) => isEqual(user.name, username));
      if (isSignUp) {
        return {
          result: 'error',
        };
      }
      const newUserJson = Object.assign(
        JSON.parse(req?.body),
        { roles: 'user' },
        { name: username },
      );
      userJson.data.userinfo = [...userJson.data.userinfo, newUserJson];
      await axios.put('/api/user', userJson);
      return {
        result: 'success',
      };
    },
  },
];

/**
 * 登录 mock
 * */
export const SignIn = [
  {
    name: 'signIn',
    type: 'post',
    url: '/api/user/signIn',
    path: '/api/user/signIn',
    /**
     * 实现登录功能
     * @param {Object} req 请求数据
     * @param {String} req.body 表单数据（字符串
     * */
    todo: (req) => {
      const data = JSON.parse(req?.body);
      // 登录信息判断
      const loginInfo = find(userJson.data.userinfo, (user) => isEqual(data, user));
      // const loginInfo = Array(...userJson.data.userinfo).find(
      //   (u) => u.username === username && u.password === password,
      // );
      return {
        result: loginInfo != null ? 'success' : 'error',
        data: {
          user: {
            username: loginInfo?.username || data.username,
            permissions: loginInfo?.permissions || null,
          },
        },
      };
      // End
    },
  },
];
