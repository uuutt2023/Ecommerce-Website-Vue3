import Mock from 'mockjs';
import store from '@/store';

const mockPaths = [];

// 动态读取modules下面的文件，添加到路由中
const files = require.context('./api', true, /\.js$/);
files.keys().forEach((key) => {
  const file = files(key).default;
  mockPaths.push(...file);
});

// console.log(mockPaths);

// 存储mock地址
store.dispatch('setMockPath', mockPaths).then(() =>
  mockPaths.map((item) => {
    if (item?.todo instanceof Function) {
      Mock.mock(item.url, item.type, item.todo);
    } else {
      Mock.mock(item.url, item.type, require(`./node/${item.name}.json`));
    }
  }),
);
