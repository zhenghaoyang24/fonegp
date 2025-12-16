import request from "./request";
import type { Response } from "@/type/request";
import type { Season } from "@/type/season";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * @returns get current season basic info
 */
export async function getCurrentSeasonInfoRequest(): Promise<Response<Season>> {
  const url = "/seasons?limit=1&offset=0"; // request URL
  const dataKeyName = "championships"; // key name of data in response
  const res = await request.get(url);
  if (res.status === 200) {
    return {
      url: BASE_URL + url,
      status: res.status,
      limit: res.data.limit,
      offset: res.data.offset,
      total: res.data.total,
      data: res.data[dataKeyName][0],
    };
  }
  return {
    url: BASE_URL + url,
    message: "Request failed with status code 404",
    status: res.status,
  };
}

export async function getAllSeasonsInfoRequest(): Promise<Response<Season[]>> {
  const url = '/seasons'; // request URL
  const dataKeyName = "championships"; // key name of data in response
  const res = await request.get(url);
  if (res.status === 200) {
    return {
      url: BASE_URL + url,
      status: res.status,
      limit: res.data.limit,
      offset: res.data.offset,
      total: res.data.total,
      data: res.data.championships,
    }
  }
  return{
    url: BASE_URL + url,
    message: "Request failed with status code 404",
    status: res.status,
  }
}
