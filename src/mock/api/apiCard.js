import catImgJson from '@/mock/node/catImg.json';
import homeCardJson from '@/mock/node/cardInfo.json';
import { getUrlQueryParams } from '@/assets/js/util';
import { filter, flow, forEach, isEqual, map, sampleSize, some } from 'lodash';

const imageUrls = catImgJson.data; // 图片API地址
const homeCard = homeCardJson.data; // 基本信息
const catInfo = homeCard.map((card, index) => ({ ...card, ...imageUrls[index] })); // 基本信息 + 图片
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
      const data = filter(catInfo, (card) => some(list, (id) => isEqual(card?.id, id)));
      return {
        result: 'success',
        data: data,
      };
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
