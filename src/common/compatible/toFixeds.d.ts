/**
 * 四舍五入保留几位小数点 toFixeds的兼容处理
 * @param {number|string} value  需要取余的数字
 * @param  {number|string} N  保留小数点后几位数
 * @return {string|null}  为null则val不是数字
 */
export declare function toFixeds(value: number | string, N: number | string): string;
