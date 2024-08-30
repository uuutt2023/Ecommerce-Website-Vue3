import catJson from '@/mock/node/cat.json';
import { filter, isEqual, map, pick } from 'lodash';
import { getUrlQueryParams } from '@/assets/js/util';

export const getCatInfo = [
  {
    name: 'cat',
    url: /\/api\/cat\/all/,
    path: '/api/cat/all',
  },
];

export const getCatInfoByName = [
  {
    name: 'catInfoByName',
    type: 'get',
    url: /\/api\/cat\/info/,
    path: '/api/cat/info',
    todo: () => {
      const { id } = getUrlQueryParams();
      return filter(catJson.data, (cat) => isEqual(cat.name, id))[0];
    },
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
