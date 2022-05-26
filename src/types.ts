export interface Options<TData, TError> {
  isLoading?: boolean;
  initData?: TData | undefined;
  cache?: string;
  onSuccess?: (response: TData) => void;
  onError?: (e: TError) => void;
}

export declare type IsAny<T, True, False = never> = true | false extends (
  T extends never ? true : false
)
  ? True
  : False;

export type UseQueryOptions<TData, TParam, TError> = {
  queryFn(): Promise<TData>;
} & Options<TData, TError> &
  (TParam extends IsAny<TParam, any> ? { param?: TParam } : { param: TParam });

export type UseMutationCallback<TData, TBody> = TBody extends IsAny<TBody, any>
  ? () => Promise<TData>
  : (body: TBody) => Promise<TData>;

export type UseMutationOptions<TData, TBody, TError> = Options<TData, TError> &
  (TBody extends IsAny<TBody, any>
    ? { queryFn: () => Promise<TData> }
    : { queryFn: (body: TBody) => Promise<TData> });
