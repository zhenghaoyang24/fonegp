interface DateParts {
    month: number;
    day: string;
}

export default {
    convertUTCtoCST(date:string,time:string){
        return  new Date(date + "T" + time);
    },

    // 获取 x月x日
    getMonthDay(date:Date){
        return `${date.getMonth()+1}月${date.getDate()}日`
    },
    // 获取 x年x月x日
    getYearMonthDate(date:Date){
        return   `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`
    },
    getHoursMinutes(date:Date){
        return date.getHours() + ":" + (date.getMinutes()===0? '00':date.getMinutes());
    },

    // 检查传入日期是否是本周
    checkWeek(date_:Date): 'before' | 'this' | 'after' {
        const now = new Date();
        const dateMonday = this.getMonday(date_);
        const nowMonday = this.getMonday(now);

        if (dateMonday < nowMonday) {
            return 'before';
        } else if (dateMonday.getTime() === nowMonday.getTime()) {
            return 'this';
        } else {
            return 'after';
        }
    },
    // 获取日期的星期一
    getMonday(date_:Date) {
        const date = new Date(date_);
        const day = date.getDay();
        const daysToSubtract = day === 0 ? 6 : day - 1;
        const monday = new Date(date.getTime() - daysToSubtract * 86400000);
        monday.setHours(0, 0, 0, 0);
        return monday;
    },
};
