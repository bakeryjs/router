const http = require('http');

const router = require('./router')();

const getAuthors = ({ filters, res }) => {
  res.setHeader('Content-Type', 'application/json');
  return JSON.stringify({
    action: 'get all authors',
    filters,
  });
};

const getAuthorBooks = ({ filters, params, res }) => {
  res.setHeader('Content-Type', 'application/json');
  return JSON.stringify({
    action: 'get all books by authorId',
    params,
    filters,
  });
};

const getAuthorBook = ({ params, res }) => {
  res.setHeader('Content-Type', 'application/json');
  return JSON.stringify({
    action: 'get book by authorId and bookId',
    params,
  });
};

const postAuthorBook = ({ params, body, res }) => {
  res.setHeader('Content-Type', 'application/json');
  return JSON.stringify({
    action: 'post book by authorId',
    params,
    body,
  });
};

const putAuthorBook = ({ params, body, res }) => {
  res.setHeader('Content-Type', 'application/json');
  return JSON.stringify({
    action: 'put book by authorId and bookId',
    params,
    body,
  });
};

const deleteAuthorBook = ({ params, res }) => {
  res.setHeader('Content-Type', 'application/json');
  return JSON.stringify({
    action: 'delete book by authorId and bookId',
    params,
  });
};

// TEST WITH: curl -X GET "http://localhost:3001/authors?page=1&size=10"
router.handle('/authors', getAuthors).provideReqRes(true);

// TEST WITH: curl -X GET "http://localhost:3001/authors/1/books?page=1&size=10"
router.handle('/authors/:authorId/books', getAuthorBooks).provideReqRes(true);

// TEST WITH: curl -X GET "http://localhost:3001/authors/1/books/2"
router
  .handle('/authors/:authorId/books/:bookId', getAuthorBook)
  .provideReqRes(true);

// TEST WITH: curl -X POST -H "Content-Type: application/json" -d '{ "title": "test" }' http://localhost:3001/authors/1/books
router
  .handle('/authors/:authorId/books', postAuthorBook)
  .method('POST')
  .provideReqRes(true);

// TEST WITH: curl -X PUT -H "Content-Type: application/json" -d '{ "title": "test" }' http://localhost:3001/authors/1/books/2
router
  .handle('/authors/:authorId/books/:bookId', putAuthorBook)
  .method('PUT')
  .provideReqRes(true);

// TEST WITH: curl -X DELETE http://localhost:3001/authors/1/books/2
router
  .handle('/authors/:authorId/books/:bookId', deleteAuthorBook)
  .method('DELETE')
  .provideReqRes(true);

const server = http.createServer(router.handler);
server.listen(3001);
