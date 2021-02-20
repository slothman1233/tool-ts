/**
 * 格式化数字（保留n位小数，补零处理）
 * @param {Number} num 需要格式化的数字
 * @param {Number} point 需要保留的小数位数 没有则传0
 * @param {String} fixeType 可选值 fixe：四舍五入保留小数，floor：向下保留小数，ceil:向上保留小数  默认为fixe; 
 * @return {String}  处理好的数字
 */
import { unmakeupDecimal } from "./unmakeupDecimal";
export function makeupDecimal(num: number, point: number, fixeType: string = "fixe"): string {
    let val: string = unmakeupDecimal(num, point, fixeType).toString();
    let arr: Array<string> = val.indexOf(".") > 0 ? val.split(".") : [val, ""];
    let index: number = point > arr[1].length ? point - arr[1].length : 0;
    if (index === 0) return val;
    let decimal: string = Math.pow(10, index).toString().slice(1);
    return arr[0] + "." + arr[1] + decimal;
}