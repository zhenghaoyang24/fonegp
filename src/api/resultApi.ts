import apiRequest from "./request";
import type { Response } from "@/type/request";
import type { RaceResult } from "@/type/common";

/**
 * @returns 获取当前赛季上一场正赛比赛结果
 */
export async function getCurrentLastRaceResult(): Promise<Response<RaceResult>> {
  const url = "/current/last/race"; // request URL
  const dataKeyName = "races"; // key name of data in response
  const res = await apiRequest<RaceResult>(url, dataKeyName);
  return res;
}
