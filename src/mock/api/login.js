import userJson from '../node/userInfo.json';

export default [
  {
    name: 'login',
    type: 'post',
    url: '/api/user/login',
    path: '/api/user/login',
    todo: (req) => {
      const { username, password } = JSON.parse(req?.body);
      // 登录信息判断
      const loginInfo = Array(...userJson.data.userinfo).find(
        (u) => u.username === username && u.password === password,
      );
      return {
        result: loginInfo != null ? 'success' : 'error',
        data: {
          username: loginInfo?.username || username,
          roles: loginInfo?.roles || null,
        },
      };
    },
  },
];
