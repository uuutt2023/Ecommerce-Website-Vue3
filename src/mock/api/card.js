import catImgJson from '@/mock/node/catImg.json';
import cardInfoJson from '@/mock/node/cardInfo.json';
import { getUrlQueryParams } from '@/assets/js/util';

const catImg = catImgJson.data,
  { cardInfo } = cardInfoJson.data;

const catInfo = cardInfo.map((item, index) => ({ ...item, ...catImg[index] }));

/**
 * 图片预加载
 * */
[...catImg].forEach(async (item) => {
  const img = new Image();
  img.src = item.url;
});

/**
 * 卡片缩略图渲染
 * */
export const GetListCardList = [
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

// /\/api\/card\/info/

/**
 * 详情页信息
 * */
export const GetCardDetail = [
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
