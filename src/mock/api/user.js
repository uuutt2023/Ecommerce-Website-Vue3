import userJson from '@/mock/node/userInfo.json';
import axios from 'axios';

export const GetAll = [{ name: 'userInfo', url: '/api/user', path: '/api/user' }];

export const ChangePwd = [
  {
    name: 'changePwd',
    type: 'post',
    url: '/api/user/changePwd',
    path: '/api/user/changePwd',
    todo: (req) => {
      const { username, password } = JSON.parse(req?.body);
      // 判断账号是否存在
      let findAcc = [...userJson.data.userinfo].find((u) => u.username === username);
      if (findAcc) {
        findAcc.password = password;
        userJson.data.userinfo[username] = findAcc;
        axios.put('/api/user', userJson).then((resp) => console.log(resp));
      }
      return {
        result: findAcc ? 'success' : 'error',
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
    todo: (req) => {
      const { username } = JSON.parse(req?.body);
      // 避免重复注册
      if ([...userJson.data.userinfo].find((u) => u.username === username)) {
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
      axios.put('/api/user', userJson).then((resp) => console.log(resp));
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
      const { username, password } = JSON.parse(req?.body);
      // 登录信息判断
      const loginInfo = Array(...userJson.data.userinfo).find(
        (u) => u.username === username && u.password === password,
      );
      return {
        result: loginInfo != null ? 'success' : 'error',
        data: {
          user: {
            username: loginInfo?.username || username,
            permissions: loginInfo?.permissions || null,
          },
        },
      };
      // End
    },
  },
];
