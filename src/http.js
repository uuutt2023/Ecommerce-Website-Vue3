import axios from 'axios';

axios.defaults.timeout = 10000;
// * post 统一请求头
axios.defaults.headers.post['Content-Type'] = 'application/json';

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: 'post',
      data: data,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}

export const get = async (url) =>
  axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
