import { isObject } from "./../obj/isObject";

/**
   * 判断是否是文本
   * @param {any} value 内容
   */
  export function isTextNode(value: any) {
    return isObject(value) && value.nodeType === 3;
  }