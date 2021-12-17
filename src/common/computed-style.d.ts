/**
 * 获取元素样式表里面的样式
 * @param {Element} el 获取样式的元素
 * @param {string} prop 样式的名称
 * @return {String | Number}
 * @example
 *  computedStyle(document.getElementById('id'),"fontSize") ==> "12px"
 */
export declare function computedStyle(el: any, prop: string): any;
