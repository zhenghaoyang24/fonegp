import apiRequest from "./request";
import type { Response } from "@/type/request";
import type { TeamChampionship } from "@/type/common";

export async function getTeamChampionshipByYear(
  year: number
): Promise<Response<TeamChampionship[]>> {
  const url = `/${year}/constructors-championship`; // request URL
  const dataKeyName = "constructors_championship"; // key name of data in response
  const res = await apiRequest<TeamChampionship[]>(url, dataKeyName);
  return res;
}
