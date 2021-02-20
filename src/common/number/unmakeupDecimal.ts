/**
 * 格式化数字（保留n位小数，不补零处理）
 * @param {Number} num 需要格式化的数字
 * @param {Number} point 需要保留的小数位数 没有则传0
 * @param {Array} fixeType 可选值 fixe：四舍五入保留小数，floor：向下保留小数，ceil:向上保留小数  默认为fixe; 
 * @return {Number}  处理好的数字
 */
export function unmakeupDecimal(num: number, point: number, fixeType: string = "fixe"): number {
    switch (fixeType) {
        case "fixe":
            return Math.round((num) * Math.pow(10, point)) / Math.pow(10, point);
        case "floor":
            return Math.floor((num) * Math.pow(10, point)) / Math.pow(10, point);
        case "ceil":
            return Math.ceil((num) * Math.pow(10, point)) / Math.pow(10, point);
    }
}