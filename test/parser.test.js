const mocha = require('mocha');
const { assert } = require('chai');

const { match, parseParams, parseFilters } = require('../lib/parser');

mocha.describe('Parser', () => {
  mocha.it('match with valid data', () => {
    const url = '/authors/1/books/2';
    const pattern = '/authors/:authorId/books/:bookId';
    const actual = match(pattern, url);
    assert.isTrue(actual);
  });
  mocha.it('match with valid data and filters', () => {
    const url = '/authors/1/books?page=1&size=10';
    const pattern = '/authors/:authorId/books';
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
  mocha.it('parse params', () => {
    const url = '/authors/1/books/2';
    const pattern = '/authors/:authorId/books/:bookId';
    const expected = { authorId: '1', bookId: '2' };
    const actual = parseParams(pattern, url);
    assert.deepStrictEqual(actual, expected);
  });
  mocha.it('parse filters', () => {
    const url = '/authors?page=1&size=10';
    const expected = { page: '1', size: '10' };
    const actual = parseFilters(url);
    assert.deepStrictEqual(actual, expected);
  });
});
