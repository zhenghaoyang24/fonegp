import apiRequest from "./request";
import type { Response } from "@/type/request";
import type { Championship } from "@/type/common";

/**
 * @returns get current season basic info
 */
export async function getCurrentSeasonInfoRequest(): Promise<Response<Championship>> {
  const url = "/seasons?limit=1&offset=0"; // request URL
  const dataKeyName = "championships[0]"; // key name of data in response
  const res = await apiRequest<Championship>(url, dataKeyName);
  return res;
}

/**
 * @returns get all seasons basic info
 */
export async function getAllSeasonsInfoRequest(): Promise<Response<Championship[]>> {
  const url = "/seasons"; // request URL
  const dataKeyName = "championships"; // key name of data in response
  const res = await apiRequest<Championship[]>(url, dataKeyName);
  return res;
}
