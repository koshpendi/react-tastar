import { useCallback, useEffect, useState } from 'react';

import { cacheObject, updateCache } from './cache-store';
import { UseQueryOptions } from './types';
import { getCacheName } from './utils';

export const useQuery = <TData = any, TParam = any, TError = any>({
  enabled = true,
  ...options
}: UseQueryOptions<TData, TParam, TError>) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isFetching, setFetching] = useState<boolean>(true);
  const [data, setData] = useState<TData | undefined>(options.initData);
  const [error, setError] = useState<TError | undefined>();
  const [isError, setIsError] = useState<boolean>(false);

  const setResolvedError = (e: TError) => {
    setError(e);
    setIsError(true);
    if (options.onError) {
      options.onError(e);
    }
  };

  const refetch = useCallback(() => {
    setFetching(true);
    options
      .queryFn()
      .then(setData)
      .catch(setResolvedError)
      .finally(() => setFetching(false));
  }, [options.param]);

  useEffect(() => {
    if (options.cache && options.cache === '') {
      throw new Error(`cache name can not be empty`);
    }
  }, [options.cache]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const cacheName = getCacheName(options.cache, options.param);

    if (options.cache && cacheObject[cacheName]) {
      const response = cacheObject[cacheName];
      setData(response);
      if (options.onSuccess) {
        options.onSuccess(response);
      }
    } else {
      setLoading(true);
      options
        .queryFn()
        .then((response) => {
          if (options.cache) {
            updateCache(cacheName, response);
          }

          setData(response);

          if (options.onSuccess) {
            options.onSuccess(response);
          }
        })
        .catch(setResolvedError)
        .finally(() => setLoading(false));
    }
  }, [options.param]);

  return {
    isLoading,
    isFetching,
    data,
    error,
    isError,
    refetch,
  };
};
