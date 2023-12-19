import cardInfoJson from '@/mock/node/cardInfo.json';
import catImgJson from '@/mock/node/catImg.json';

/**
 * 卡片缩略图渲染
 * */
export const GetListCardList = [
  {
    name: 'cardInfo',
    type: 'get',
    url: /\/api\/card\/list/,
    path: '/api/card/list',
    todo: () => {
      const [{ cardInfo }, { catImg }] = [cardInfoJson.data, catImgJson.data];
      return cardInfo.map((item, index) => ({ ...item, ...catImg[index] }));
    },
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
    todo: (resp) => {
      console.log(resp);
    },
  },
];
