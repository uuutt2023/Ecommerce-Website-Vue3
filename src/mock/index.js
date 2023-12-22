import Mock from 'mockjs';
import store from '@/store/store';

const mockPaths = [];

// 动态读取modules下面的文件，添加到路由中
const files = require.context('./api', true, /\.js$/);
files.keys().forEach((key) => {
  for (const module in files(key)) {
    const file = files(key)[module];
    // 导入模块内所有方法
    if (file instanceof Object) {
      mockPaths.push(...file);
    }
  }
});

// 存储mock地址
store.commit('setMockPath', mockPaths);
mockPaths.map((item) => {
  // 自动注册mock
  if (item?.todo instanceof Function) {
    Mock.mock(item.url, item?.type, item.todo);
  } else {
    Mock.mock(item.url, item?.type, require(`./node/${item.name}.json`));
  }
});
