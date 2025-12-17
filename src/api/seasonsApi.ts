import apiRequest from "./request";
import type { Response } from "@/type/request";
import type { Season } from "@/type/season";

/**
 * @returns get current season basic info
 */
export async function getCurrentSeasonInfoRequest(): Promise<Response<Season>> {
  const url = "/seasons?limit=1&offset=0"; // request URL
  const dataKeyName = "championships[0]"; // key name of data in response
  const res = await apiRequest<Season>(url, dataKeyName);
  return res;
}

/**
 * @returns get all seasons basic info
 */
export async function getAllSeasonsInfoRequest(): Promise<Response<Season[]>> {
  const url = "/seasons"; // request URL
  const dataKeyName = "championships"; // key name of data in response
  const res = await apiRequest<Season[]>(url, dataKeyName);
  return res;
}
