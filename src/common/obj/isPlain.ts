import { isObject } from "./isObject"
/**
 * 判断是否是数组对象类型
 * @param value 值
 */
export function isPlain(value:any) {
    return isObject(value) &&
      Object.prototype.toString.call(value) === '[object Object]' &&
      value.constructor === Object;
  }