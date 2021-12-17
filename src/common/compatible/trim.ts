/**
 * 去掉字符串的前后空格
 * @param {string} value 字符串
 * @return {string} 去掉前后空格的字符串
 */
export function trim(value: string): string {
    if (Object.prototype.toString.call(value) !== "[object String]") return value;
    return value.replace(/^\s*|\s*$/, "");
  }