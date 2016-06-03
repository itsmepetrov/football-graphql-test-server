import config from 'config';

export function generateApiUrl(pathBeforeToken, pathAfterToken, isJSON = true) {
  return `${config.api.host}:${config.api.port}/${config.api.path}/${pathBeforeToken}/${config.api.token}/${pathAfterToken}${isJSON ? '/json' : ''}`;
}
