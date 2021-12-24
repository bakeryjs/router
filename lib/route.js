const http = require('http');

module.exports = (pattern, handler) => {
  const options = {
    pattern,
    handler,
    method: 'GET',
    provideReqRes: false,
    sendResponse: true,
  };
  return {
    get options() {
      const copy = object =>
        Object.keys(object)
          .map(key => ({ key, value: object[key] }))
          .reduce((accumulator, current) => {
            const { key, value } = current;
            accumulator[key] = typeof value === 'object' ? copy(value) : value;
            return accumulator;
          }, {});
      return copy(options);
    },
    method(value) {
      if (!http.METHODS.includes(value.toUpperCase())) {
        throw new Error(`HTTP method ${value} doesn't exists!`);
      }
      options.method = value.toUpperCase();
      return this;
    },
    provideReqRes(value) {
      options.provideReqRes = value;
      return this;
    },
    sendResponse(value) {
      options.sendResponse = value;
      return this;
    },
  };
};
