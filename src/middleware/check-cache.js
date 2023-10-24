'use strict';
import { cache } from '../libs/cache.js';

async function checkCache(req, res, next) {
  const cacheKey = `__kctm__${req.url}`;
  const data = cache.get(cacheKey);
  console.log(cacheKey);
  console.log(data);
  if (data === undefined) {
    return next();
  } else {
    return res.status(StatusCodes.OK).json({ tasks: data, errors: null });
  }
}

export { checkCache };
