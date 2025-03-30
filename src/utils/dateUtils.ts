export default {


    getCurrentDateUtil() {
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let day = now.getDate();
        const time = [now.getHours(),now.getMinutes(),now.getSeconds()] ;
        let week = this.getWeekUtil(now.getDay());
        return [year, month, day,time,week];
    },
    dealDateUtil(date:any) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // 月份从0开始，需要加1
        const day = parseInt(date.getDate());
        const time = [parseInt(date.getHours()),parseInt(date.getMinutes()),parseInt(date.getSeconds())] ;
        const week = this.getWeekUtil(date.getDay());
        return [year, month, day,time,week];
    },
    getWeekUtil(n:Number) {
        if (n === 0) {
            return "星期日"
        } else if (n === 1) {
            return "星期一";
        } else if (n === 2) {
            return "星期二";
        } else if (n === 3) {
            return "星期三";
        } else if (n === 4) {
            return "星期四";
        } else if (n === 5) {
            return "星期五";
        } else if (n === 6) {
            return "星期六";
        }
    },
    getFullYear(): number {
        return  new Date().getFullYear();
    }
}
