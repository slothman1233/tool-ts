import { isObject } from "./../obj/isObject";

/**
 * 是否是元素
 * @param {any} value 元素
 */
export function isEl(value?: any) {
    return value && isObject(value) && value.nodeType === 1;
  }