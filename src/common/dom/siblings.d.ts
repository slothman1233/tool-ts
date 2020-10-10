/**
 * 当前元素的同辈元素
 * @param {string | Element} ele 当前元素
 * @param {Function} callback 每个元素的回调方法
 * @return {Array<Element>} 返回对象数组
 * @example
 *    fx.siblings("sss" | document.querySelector("div") | document.querySelectorAll("div"))
 */
export declare function siblings(ele: string | Element, callback?: Function): Array<Element>;
