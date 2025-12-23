interface Response<T> {
  url: string;
  status: number;
  message?: string;
  limit?: number;
  offset?: number;
  total?: number;
  season?: number;
  championshipId?: string;
  data?: T;
}
export type { Response };
