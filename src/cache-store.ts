type CacheType = { [key: string]: any };
type UpdateCacheFnType = <T>(cacheName: string, data: T) => void;

export let cacheObject: CacheType = {};

export let updateCache: UpdateCacheFnType = <T>(name: string, data: T) => {
  cacheObject = {
    ...cacheObject,
    [name]: data,
  };
};
