const match = (pattern, url) => {
  const splittedPattern = pattern.split('/');
  const splittedUrl = url.split('/');
  if (splittedPattern.length !== splittedUrl.length) {
    return false;
  }
  const count = splittedPattern.length;
  for (let i = 0; i < count; i++) {
    const patternPart = splittedPattern[i];
    const urlPart = splittedUrl[i];
    if (patternPart[0] === ':' && patternPart === urlPart) {
      return false;
    }
    if (patternPart[0] !== ':' && patternPart !== urlPart) {
      return false;
    }
  }
  return true;
};

const parse = (pattern, url) => {
  const result = {};
  let i = 0;
  let j = 0;
  while (true) {
    const patternPart = pattern[i];
    const urlPart = url[j];
    if (!patternPart || !urlPart) {
      break;
    }
    if (patternPart !== urlPart && patternPart === ':') {
      i += 1;
      let key = '';
      let value = '';
      while (true) {
        const entry = pattern[i++];
        if (!entry || entry === '/') {
          break;
        }
        key += entry;
      }
      while (true) {
        const entry = url[j++];
        if (!entry || entry === '/') {
          break;
        }
        value += entry;
      }
      result[key] = Number(value);
    }
    i += 1;
    j += 1;
  }
  return result;
};

module.exports = { match, parse };
