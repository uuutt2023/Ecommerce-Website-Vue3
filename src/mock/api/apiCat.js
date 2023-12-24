import catInfo from '@/mock/node/cat.json';

console.log(catInfo);

export const getCatList = [
  {
    name: 'cat',
    type: 'get',
    url: /\/api\/cat\/all/,
    path: '/api/cat/all',
  },
];
