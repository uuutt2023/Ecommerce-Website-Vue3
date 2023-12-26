import catJson from '@/mock/node/cat.json';
import { map, pick } from 'lodash';

export const getCatInfo = [
  {
    name: 'cat',
    type: 'get',
    url: /\/api\/cat\/all/,
    path: '/api/cat/all',
  },
];

export const getCatCard = [
  {
    name: 'categories',
    type: 'get',
    url: /\/api\/cat\/card/,
    path: '/api/cat/card',
    todo: () =>
      map(catJson.data, (info) =>
        pick(info, ['nickname', 'cname', 'name', 'avatar_src', 'from', 'body_type', 'hair_length']),
      ),
  },
];
