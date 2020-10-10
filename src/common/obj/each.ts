import { isObject } from "./isObject";

const keys = function (object:any) {
    return isObject(object) ? Object.keys(object) : [];
  };
  
  /**
   * 对象的循环
   * @param {Object} object 对象
   * @param {Function} fn(value,key) 回调的函数
   */
  export function each(object:any, fn:Function) {
    keys(object).forEach(key => fn((<any>object)[key], key));
  }