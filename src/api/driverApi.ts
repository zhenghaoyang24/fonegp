import apiRequest from "./request";
import type { Response } from "@/type/request";
import type { DriverChampionship } from "@/type/common";
/**
 * @returns get current season basic info
 */
export async function getDriversChampionshipByYear(
  year: number
): Promise<Response<DriverChampionship[]>> {
  const url = `/${year}/drivers-championship`; // request URL
  const dataKeyName = "drivers_championship"; // key name of data in response
  const res = await apiRequest<DriverChampionship[]>(url, dataKeyName);
  return res;
}
