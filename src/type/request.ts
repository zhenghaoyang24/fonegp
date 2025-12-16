interface Response<T> {
  url: string;
  status: number;
  message?: string;
  limit?: number;
  offset?: number;
  total?: number;
  data?: T;
}
export type { Response };
