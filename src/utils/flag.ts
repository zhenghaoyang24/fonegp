// 假设你的 JSON 数据长这样（也可以从文件导入）：
import { countryCode } from "@/data/countryCode";

/**
 * 获取国家国旗的 CDN 地址
 * @param input 国家名称（如 "Andorra"）或国家代码（如 "ad"）
 * @returns 返回 https://flagcdn.com/${code}.svg，若未找到则返回 null 或抛出错误
 */
export function getFlagUrl(input: string): string | null {
  // 情况 1: input 是国家代码（小写两位字母）
  if (input.length === 2 && /^[a-z]{2}$/.test(input.toLowerCase())) {
    const code = input.toLowerCase();
    if (countryCode[code]) {
      return `https://flagcdn.com/${code}.svg`;
    }
  }

  // 情况 2: input 是国家名称
  const code = Object.keys(countryCode).find(
    (key) => countryCode[key].toLowerCase() === input.toLowerCase()
  );

  if (code) {
    return `https://flagcdn.com/${code}.svg`;
  }

  // 未找到
  return null; // 或 throw new Error(`Country or code not found: ${input}`);
}
