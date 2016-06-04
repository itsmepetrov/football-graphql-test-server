import config from 'config';
import Redis from 'ioredis';
import fetch from 'node-fetch';

const redis = Redis();

export function generateApiUrl(pathBeforeToken, pathAfterToken, isJSON = true) {
  return `${config.api.host}:${config.api.port}/${config.api.path}/${pathBeforeToken}/${config.api.token}/${pathAfterToken}${isJSON ? '/json' : ''}`;
}

/**
 * If cache param enabled, store info into the redis
 * @param url
 * @param expire
 * @returns {Promise}
 */
export function cachedFetch(url, {expire} = {}) {
  return new Promise((resolve, reject) => {

    // if cache disabled, just fetch data from url
    if (!config.cache.enable) {
      return resolve(_fetchData(url))
    }

    // try to get data from redis
    redis.get(url, (err, result) => {

      // If error send reject
      if (err) {
        return reject(err);
      }

      // If data exists in the redis, then resolve it
      if (result) {
        return resolve(JSON.parse(result));
      }

      // Try to set data to redis and resolve it on success
      return _fetchData(url)
        .then(json => {

          // Write json serialized data to redis and cache it
          redis.pipeline().set(url, JSON.stringify(json)).expire(url, config.cache.expire || 3600000 * 24).exec((err, results) => {

            if (err) {
              return reject(err);
            }

            // resolve our data
            resolve(json);

        });    
      });
    })
  });
}


/**
 * Fetch data by url
 * @param url
 * @returns {Promise}
 * @private
 */
function _fetchData(url) {
  return new Promise((resolve, reject) => {
    return fetch(url)
      .then(res => res.json())
      .then(resolve)
      .catch(console.log)
  })
}
