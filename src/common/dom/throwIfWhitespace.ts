import fxLanguage from "../../languages/cn";
/**
 * 类具有非法空格字符
 * @param {string} str 字符串 
 * @return {boolean}  
 */
export function throwIfWhitespace(str: string) {
    if ((/\s/).test(str)) {
      throw new Error(`${fxLanguage.dom.throwWhitespace}`);
    }
  }