const mocha = require('mocha');
const { assert } = require('chai');

const Route = require('../lib/route');

mocha.describe('Route test', () => {
  mocha.it('validate default values', () => {
    const pattern = 'test-pattern';
    const route = Route(pattern, () => {});
    assert.strictEqual(route.options.pattern, pattern);
    assert.typeOf(route.options.handler, 'function');
    assert.strictEqual(route.options.method, 'GET');
    assert.isFalse(route.options.provideReqRes);
    assert.isTrue(route.options.sendResponse);
  });
  mocha.it('validate builder', () => {
    const route = Route('test-pattern', () => {})
      .method('POST')
      .provideReqRes(true)
      .sendResponse(false);
    assert.strictEqual(route.options.method, 'POST');
    assert.isTrue(route.options.provideReqRes);
    assert.isFalse(route.options.sendResponse);
  });
  mocha.it('check if throws error on invalid method', () => {
    const method = 'invalid-method';
    const message = `HTTP method ${method} doesn't exists!`;
    assert.throws(Route().method.bind(null, method), message);
  });
  mocha.it('check is options field immutable', () => {
    const route = Route('test-pattern', () => {});
    const { options } = route;
    options.method = 'POST';
    options.provideReqRes = true;
    options.sendResponse = false;
    assert.notDeepEqual(route.options, options);
  });
});
