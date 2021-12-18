const mocha = require('mocha');
const assert = require('assert');

mocha.describe('Stub test', () => {
  mocha.it('should pass', () => {
    assert.strictEqual(true, true);
  });
});
