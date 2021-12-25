const { match, parseFilters, parseParams } = require('./parser');
const Route = require('./route');

module.exports = () => {
  const routes = [];
  const handle = (pattern, handler) => {
    const route = Route(pattern, handler);
    routes.push(route);
    return route;
  };
  const handler = async (req, res) => {
    const { url, method } = req;
    const route = routes.find(entry => {
      const isMatch = match(entry.options.pattern, url);
      const isMethodsEqual = entry.options.method === method;
      return isMatch && isMethodsEqual;
    });
    if (!route) {
      res.writeHead(404);
      res.end(`Cannot resolve handler for ${method}:${url}`);
      return;
    }
    const params = {
      filters: parseFilters(url),
      params: parseParams(route.options.pattern, url),
    };
    if (route.options.provideReqRes) {
      params.req = req;
      params.res = res;
    }
    const result = await route.options.handler(params);
    if (route.options.sendResponse) {
      res.end(result);
    }
  };
  return {
    handle,
    handler,
  };
};
