const mocha = require('mocha');
const { assert } = require('chai');

const Handler = require('../lib/handler');

mocha.describe('Handler', () => {
  mocha.it(
    'validate parsing and route integration with params and filters',
    async () => {
      const handler = Handler();
      const { params, filters, req, res } = await new Promise(resolve => {
        handler.handle('/authors/:authorId/books', resolve).provideReqRes(true);
        handler.handler(
          { url: '/authors/1/books?page=1&size=10', method: 'GET' },
          {},
        );
      });
      const expectedParams = { authorId: '1' };
      const expectedFilters = { page: '1', size: '10' };
      assert.deepStrictEqual(params, expectedParams);
      assert.deepStrictEqual(filters, expectedFilters);
      assert.isObject(req);
      assert.isObject(res);
    },
  );
});
