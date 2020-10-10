import { throwIfWhitespace } from "./throwIfWhitespace";
import { classRegExp } from "./classRegExp";
/**
 * 检索元素的类中是否包含该类
 * @param {Element} element  查找的元素
 * @param {String} classToCheck 需要匹配的类
 * @return {boolean} true包含  false包含
 */
export function hasClass(element: any, classToCheck: string) {
    if (!element) return false;
    throwIfWhitespace(classToCheck);
    if (element.classList) {
      return element.classList.contains(classToCheck);
    }
    return classRegExp(classToCheck).test(element.className);
  }