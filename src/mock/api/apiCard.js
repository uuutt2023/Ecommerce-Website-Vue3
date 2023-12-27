import catImgJson from '@/mock/node/catImg.json';
import homeCardJson from '@/mock/node/cardInfo.json';
import { getUrlQueryParams } from '@/assets/js/util';
import { filter, flow, forEach, isEqual, map, sampleSize, some, unionBy, update } from 'lodash';

const imageUrls = catImgJson.data; // 图片API地址
const homeCard = homeCardJson.data; // 基本信息
let catInfo = homeCard.map((card, index) => ({ ...card, ...imageUrls[index] })); // 基本信息 + 图片
forEach(catInfo, async ({ url }) => (new Image().src = url)); // 图片预加载

/**
 * 卡片缩略图渲染
 * */
export const getListCardList = [
  {
    name: 'cardInfo',
    type: 'get',
    url: /\/api\/card\/list/,
    path: '/api/card/list',
    todo: () =>
      catInfo.map((item) => ({
        id: item.id,
        title: item.title,
        url: item.url,
      })),
  },
];

/**
 * 详情页信息
 * */
export const getCardDetail = [
  {
    name: 'cardDetail',
    type: 'get',
    url: /\/api\/detail\/cat/,
    path: '/api/detail/cat',
    todo: () => {
      const { id } = getUrlQueryParams();
      return catInfo.find((item) => item.id === id);
    },
  },
];

/**
 * 获取收藏列表
 * */
export const getListFavoritesById = [
  {
    name: 'favorites',
    type: 'post',
    url: /\/api\/card\/favorites/,
    path: '/api/card/favorites',
    todo: (req) => {
      let { list } = JSON.parse(req.body);
      return filter(catInfo, (card) => some(list, (id) => isEqual(card?.id, id)));
    },
  },
];

/**
 * 随机图片
 * */
export const randomListImagesOfCat = [
  {
    name: 'listImages',
    type: 'get',
    url: /\/api\/random\/img\/cat/,
    path: '/api/random/img/cat',
    todo: (res) =>
      flow(
        getUrlQueryParams,
        ({ count }) => sampleSize(catImgJson.data, count),
        (list) => map(list, (item) => item.url),
      )(res.url),
  },
];

export const addCommentByCardId = [
  {
    name: 'addComment',
    type: 'post',
    url: /\/api\/add\/comment/,
    path: '/api/add/comment',
    todo: (req) => {
      const { id, comment, name, avatar } = JSON.parse(req.body);
      const updateInfo = update(
        catInfo.find((cat) => isEqual(cat.id, id)),
        'user_messages',
        (value) => [
          ...value,
          {
            avatar,
            comment: comment,
            name: name,
          },
        ],
      );
      catInfo = unionBy(catInfo, updateInfo, 'id');
      return updateInfo;
    },
  },
];

export const getCardOfSearch = [
  {
    name: 'searchCard',
    type: 'get',
    url: /\/api\/card\/search/,
    path: '/api/card/search',
    todo: (req) => {
      const { term } = getUrlQueryParams(req.url);
      return catInfo.filter((cat) => cat.title.includes(term));
    },
  },
];
