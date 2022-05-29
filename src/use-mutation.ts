import { useCallback, useEffect, useState } from 'react';

import { cacheObject, updateCache } from './cache-store';
import { UseMutationCallback, UseMutationOptions } from './types';
import { getCacheName } from './utils';

interface Result<TData, TBody, TError> {
  mutate: UseMutationCallback<TData, TBody>;
  isLoading: boolean;
  data: TData | undefined;
  error: TError | undefined;
  isError: boolean;
}

export const useMutation = <TData = any, TBody = any, TError = any>(
  options: UseMutationOptions<TData, TBody, TError>,
): Result<TData, TBody, TError> => {
  const [isLoading, setLoading] = useState<boolean>(options.isLoading || false);
  const [data, setData] = useState<TData | undefined>(options.initData);
  const [error, setError] = useState<TError | undefined>();
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (options.cache && options.cache === '') {
      throw new Error(`cache name can not be empty`);
    }
  }, [options.cache]);

  const mutation = useCallback((...args) => {
    const [body] = args;
    const cacheName = getCacheName(options.cache, body);

    if (options.cache && cacheObject[cacheName]) {
      const response = cacheObject[cacheName];

      setData(response);

      if (options.onSuccess) {
        options.onSuccess(response);
      }

      return Promise.resolve(response);
    } else {
      setLoading(true);
      return options
        .mutationFn(body)
        .then((response) => {
          if (options.cache) {
            updateCache(cacheName, response);
          }

          setData(response);

          if (options.onSuccess) {
            options.onSuccess(response);
          }

          return response;
        })
        .catch((e: TError) => {
          setError(e);
          setIsError(true);
          if (options.onError) {
            options.onError(e);
          }
        })
        .finally(() => setLoading(false));
    }
  }, []);

  return {
    mutate: mutation as UseMutationCallback<TData, TBody>,
    data,
    error,
    isError,
    isLoading,
  };
};
