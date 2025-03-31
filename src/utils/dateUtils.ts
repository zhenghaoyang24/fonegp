interface DateParts {
    month: number;
    day: string;
}

export default {
    // 格式化日期为 month ， day
    getDateParts(dateStr: string): DateParts {
        const [year, month, day] = dateStr.split('-');
        return {
            month: parseInt(month, 10),
            day: day.padStart(2, '0')
        };
    },
    // 格式化为月 日
    formatDate(parts: DateParts): string {
        return `${parts.month}月${parts.day}`;
    },
    /**
     * 判断比赛日期状态
     * @param dateString 格式为 YYYY-MM-DD 的日期字符串
     * @returns 0: 已过去 | 1: 本周 | 2: 将来
     */
     raceStatusFormat(dateString: string): 0 | 1 | 2 {

        // 解析输入日期
        const targetDate = new Date(dateString);
        targetDate.setHours(0, 0, 0, 0);
        if (isNaN(targetDate.getTime())) {
            throw new Error('Invalid date format. Expected YYYY-MM-DD');
        }

        // 获取当前日期（去除时间部分）
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // 计算本周的开始（周一）和结束（周日）
        const dayOfWeek = today.getDay() || 7; // 将周日转换为7
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - dayOfWeek + 1);

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        // 日期比较
        if (targetDate < weekStart) {
            return 0; // 本周之前
        } else if (targetDate > today && targetDate > weekEnd) {
            return 2; // 本周之后
        } else {
            return 1; // 本周
        }
    }
};
