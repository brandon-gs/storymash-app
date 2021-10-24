export const getQueryPagination = (limit: number, page: number) => {
  return `limit=${limit}&page=${page}&offset=${page * limit}`;
};
