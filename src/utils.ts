export const getCacheName = (cachName: string | undefined, param: any): string => {
  return `${cachName}_${JSON.stringify(param)}`;
};
