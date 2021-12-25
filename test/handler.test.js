const mocha = require('mocha');
const { assert } = require('chai');

const Handler = require('../lib/handler');

mocha.describe('Handler', () => {
  mocha.it('validate parsing and route integration', () => {
    const handler = Handler();
    handler
      .handle('/authors/:authorId/books', ({ params, filters, req, res }) => {
        const expectedParams = { authorId: '1' };
        const expectedFilters = { page: '1', size: '10' };
        assert.deepStrictEqual(params, expectedParams);
        assert.deepStrictEqual(filters, expectedFilters);
        assert.isObject(req);
        assert.isObject(res);
      })
      .provideReqRes(true);
    handler
      .handle('/authors/:authorId/books/:bookId', ({ params }) => {
        const expectedParams = { authorId: '1', bookId: '2' };
        assert.deepStrictEqual(params, expectedParams);
      })
      .method('DELETE');
    handler.handler(
      { url: '/authors/1/books?page=1&size=10', method: 'GET' },
      {},
    );
    handler.handler({ url: '/authors/1/books/2', method: 'DELETE' }, {});
  });
});
