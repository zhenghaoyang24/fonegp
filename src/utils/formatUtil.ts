/**
 * 格式化公里数
 * @param input 输入字符串
 * @returns 格式化后的字符串
 */
export function formatKm(input: string) {
  // 提取所有数字（移除所有非数字字符）
  const numStr = input.replace(/\D/g, "");

  // 转换为整数
  const num = parseInt(numStr, 10);
  if (isNaN(num)) return input; // 无效时原样返回

  const km = num / 1000; // 转为公里（带小数）
  return km.toFixed(3) + "km";
}
