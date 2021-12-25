# bakeryjs/router


## Installation

Install library via npm:
```bash
$ npm install @bakeryjs/router
```

## How to use

Create a new router:

```javascript
const router = require('./router')();

// or (if it's needed to use different routers that will be isolated from each other)

const Router = require('./router');
const router = Router()
```

Configure route (endpoint) and it's handler:

```javascript
router.handle('/authors/:authorId/books', createBook)
  .method('POST')
  .provideReqRes(true)
  .sendResponse(false);
```

Set handler for http server:

```javascript
const server = http.createServer(router.handler);
```

## API reference

### Router

- `(method) handle: (pattern: string, handler: function)` - register endpoint and it's handler

NOTE: use '`:`' symbol to indicate a query parameter

- `(property) handler: function` - get http handler 

### Route

- `(method) method(value: string)` - set HTTP method for route (`GET` by default)
- `(method) provideReqRes(value: boolean)` - provide `req` and `res` objects to handler function (`false` by default)
- `(method) sendResponse(value: boolean)` - send response with function return value (`true` by default)

NOTE: if it's needed to send custom response from hanlder the `provideReqRes` should be true to get `req` object and use it to prepare and send response 


## Demo

Take a look on [demo](https://github.com/bakeryjs/router/blob/main/demo.js) project.
