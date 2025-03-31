const countryMap: Record<string, string> = {
    'Australian': '澳大利亚',
    'Chinese': '中国',
    'Japanese': '日本',
    'Bahrain': '巴林',
    'Saudi Arabian': '沙特阿拉伯',
    'Miami': '迈阿密',
    'Made in Italy': '意大利',
    'Emilia-Romagna': '艾米利亚-罗马涅',
    'Monaco': '摩纳哥',
    'España': '西班牙',
    'Canada': '加拿大',
    'Austrian': '奥地利',
    'British': '英国',
    'Belgian': '比利时',
    'Hungarina': '匈牙利',
    'Dutch': '荷兰',
    'Italia': '意大利',
    'Azerbaijan': '阿塞拜疆',
    'Singapore': '新加坡',
    'United States': '美国',
    'México': '墨西哥',
    'Sao Paulo': '圣保罗',
    'Las Vegas': '拉斯维加斯',
    'Qatar': '卡塔尔',
    'Abu Dhabi': '阿布扎比'
};
export default {
    /**
     * 大奖赛名称格式化
     * @param grandPrixName 赛事全名（可包含赞助商和年份）
     * @returns 中文赛事名称
     */
    grandPrixFormatUtil(grandPrixName: string): string {
        // 直接遍历判断包含关系
        for (const [key, value] of Object.entries(countryMap)) {
            if (grandPrixName.includes(key)) {
                return `${value}大奖赛`;
            }
        }

        // 兜底返回原名称（移除年份）
        return grandPrixName.replace(/\d{4}$/, '').trim() + '大奖赛';
    }
}
; // "意大利大奖赛"
