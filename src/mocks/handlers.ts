import { rest } from 'msw';

const RESPONSE = {
  photos: {
    page: 1,
    pages: 10,
    perpage: 12,
    photo: [
      {
        farm: 66,
        id: '36493087974',
        isfamily: 0,
        isfriend: 0,
        ispublic: 1,
        license: '4',
        owner: '96925387@N00',
        ownername: 'Jeanne Menjoulet',
        secret: '4df1b792a8',
        server: '65535',
        title: 'title 1',
      },
      {
        farm: 66,
        id: '36493087977',
        isfamily: 0,
        isfriend: 0,
        ispublic: 1,
        license: '4',
        owner: 'hanna',
        ownername: 'hanna papova',
        secret: '4df1b792a8',
        server: '65535',
        title: 'picture 2',
      },
    ],
    total: 122607,
  },
  stat: 'ok',
};

export const HANDLERS = [
  rest.get('https://www.flickr.com/', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        ...RESPONSE,
      })
    );
  }),
];
