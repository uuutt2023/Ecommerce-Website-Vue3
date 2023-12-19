import catImgJson from '@/mock/node/catImg.json';
import Mock from 'mockjs';

const catImg = catImgJson.data;
console.log(catImg);
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
    todo: () => {
      const cardInfo = Mock.mock({
        'cats|100': [
          {
            animal: '猫',
            'breed|1': [
              '英短猫',
              '布偶猫',
              '波斯猫',
              '暹罗猫',
              '缅因猫',
              '挪威森林猫',
              '孟买猫',
              '俄罗斯蓝猫',
            ],
            description: '@cword(10, 20)',
            'fur_color|1': ['蓝色', '奶白色', '灰色', '黑色', '橘色', '棕色', '斑点', '三花'],
            name: '@cname',
            title: '@ctitle(5, 10)',
            'user_messages|2-5': [
              {
                'uid|1-40': 1,
                sender: '@cname',
                message: '@cparagraph(1, 3)',
              },
            ],
          },
        ],
      });
      return cardInfo?.cats.map((item, index) => ({ ...item, ...catImg[index] }));
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
