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

const postAuthorBook = ({ params, res }) => {
  res.setHeader('Content-Type', 'application/json');
  return JSON.stringify({
    action: 'post book by authorId',
    params,
  });
};

const putAuthorBook = ({ params, res }) => {
  res.setHeader('Content-Type', 'application/json');
  JSON.stringify({
    action: 'put book by authorId and bookId',
    params,
  });
};

const deleteAuthorBook = ({ params, res }) => {
  res.setHeader('Content-Type', 'application/json');
  JSON.stringify({
    action: 'delete book by authorId and bookId',
    params,
  });
};

router.handle('/authors', getAuthors).provideReqRes(true);
router.handle('/authors/:authorId/books', getAuthorBooks).provideReqRes(true);
router
  .handle('/authors/:authorId/books/:bookId', getAuthorBook)
  .provideReqRes(true);
router
  .handle('/authors/:authorId/books', postAuthorBook)
  .method('POST')
  .provideReqRes(true);
router
  .handle('/authors/:authorId/books/:bookId', putAuthorBook)
  .method('PUT')
  .provideReqRes(true);
router
  .handle('/authors/:authorId/books/:bookId', deleteAuthorBook)
  .method('DELETE')
  .provideReqRes(true);

const server = http.createServer(router.handler);
server.listen(3001);
