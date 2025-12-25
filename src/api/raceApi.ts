import apiRequest from "./request";
import type { Response } from "@/type/request";
import type { Race } from "@/type/common";

/**
 * get currrent season race list
 * @param limit get number of races
 * @returns
 */
export async function getCurrentRaceList(): Promise<Response<Race[]>> {
  const url = "/current"; // request URL
  const dataKeyName = "races"; // key name of data in response
  const res = await apiRequest<Race[]>(url, dataKeyName);
  return res;
}

/**
 * get race list by year
 * @param year get race list by year
 * @param limit get number of races
 * @returns
 */

export async function getRaceListByYear(
  year: number,
  limit?: number,
  offset?: number
): Promise<Response<Race[]>> {
  const url = "/" + year + "?limit=" + limit + "&offset=" + offset; // request URL
  const dataKeyName = "races"; // key name of data in response
  const res = await apiRequest<Race[]>(url, dataKeyName);
  return res;
}

