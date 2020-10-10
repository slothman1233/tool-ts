/**
 * 正则表达式化
 * @param {string} className 正则的匹配内容
 * @return {RegExp} 正则表达式对象
 */
export function classRegExp(className: string) {
    return new RegExp('(^|\\s)' + className + '($|\\s)');
  }