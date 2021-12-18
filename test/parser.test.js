const mocha = require('mocha');
const { assert } = require('chai');

const { match, parse } = require('../lib/parser');

mocha.describe('Parser test', () => {
  mocha.it('match pattern with one value', () => {
    const url = '/authors/1';
    const pattern = '/authors/:authorId';
    const actual = match(pattern, url);
    assert.isTrue(actual);
  });
  mocha.it('match with two values', () => {
    const url = '/authors/1/books/2';
    const pattern = '/authors/:authorId/books/:bookId';
    const actual = match(pattern, url);
    assert.isTrue(actual);
  });
  mocha.it('match with invalid pattern', () => {
    const url = '/authors/1/books/2';
    const pattern = '/authors/:authorId';
    const actual = match(pattern, url);
    assert.isFalse(actual);
  });
  mocha.it('match with invalid url', () => {
    const url = '/authors/1';
    const pattern = '/authors/:authorId/books/:bookId';
    const actual = match(pattern, url);
    assert.isFalse(actual);
  });
  mocha.it('parse pattern with one value', () => {
    const url = '/authors/1';
    const pattern = '/authors/:authorId';
    const expected = { authorId: 1 };
    const actual = parse(pattern, url);
    assert.deepStrictEqual(actual, expected);
  });
  mocha.it('parse with two values', () => {
    const url = '/authors/1/books/2';
    const pattern = '/authors/:authorId/books/:bookId';
    const expected = { authorId: 1, bookId: 2 };
    const actual = parse(pattern, url);
    assert.deepStrictEqual(actual, expected);
  });
});
