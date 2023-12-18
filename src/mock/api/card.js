import card from '@/mock/node/cardInfo.json';
import catImg from '@/mock/node/catImg.json';
import { getUrlQueryParams } from '@/assets/js/util';

/**
 * 卡片所有数据
 * */
export const GetListCardInfo = [
  {
    name: 'cardInfo',
    url: /\/api\/card\/info/,
    path: '/api/card/info',
    todo: (req) => {
      let infoArray = [...card.data.cardInfo];
      let { num } = getUrlQueryParams(req.url);

      let result = [];
      do {
        result.push(...infoArray.slice(0, num < 8 ? num : 8));
        console.log(num, result);
        num -= 8;
      } while (num >= 8);

      return result.map((item, index) => ({
        ...item,
        ...catImg.data[index],
      }));
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
    url: /\/api\/card\/detail/,
    path: '/api/card/detail',
    todo: (resp) => {
      console.log(resp, card);
    },
  },
];
