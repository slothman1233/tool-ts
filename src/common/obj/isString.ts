/**
 * 判断是否是字符串
 * @param value 值
 */
export function isString(value:any) {
    return Object.prototype.toString.call(value) === "[object String]"
  }