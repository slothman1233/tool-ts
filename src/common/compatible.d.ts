export interface IE8HTMLInputElement extends HTMLInputElement {
    attachEvent(event: string, listener: EventListener): boolean;
    detachEvent(event: string, listener: EventListener): boolean;
}
/**
 * 绑定方法
 * @param {Element} obj 绑定的元素
 * @param {String} type 方法名称
 * @param {function} fn  绑定的方法
 */
export declare const addEvent: (obj: any, type: string, fn: any) => void;
/**
 * 解除方法绑定
 * @param {Element} obj 解除方法绑定的元素
 * @param {String} type 方法名称
 * @param {function} fn  解除方法绑定的方法
 */
export declare const removeEvent: (obj: any, type: string, fn?: any) => void;
/**
 * 获取cookie里面的值
 * @param {String} name cookie名称
 * @param {String} 对应cookie名称的值  不存在返回null
 */
export declare const getCookie: (name: string) => string;
/**
 * 写入cookie
 * @param {String} name  cookie名
 * @param {String} value cookie值
 * @param {String} time  存储时间 收一个字符是代表的时间名词
                        s20是代表20秒
                        h是指小时，如12小时则是：h12
                        d是天数，30天则：d30
 */
export declare const setCookie: (name: string, value: string, time: string) => void;
/**
 * 获取链接的参数
 * @param {String} name 参数名
 * @return {String} 对应参数名的值  不存在返回null
 */
export declare const GetQueryString: (name: string) => string;
/**
 * 获取链接hash后面的参数
 * @param {String} name hash名称
 * @param {String} 对应的hash名称的值
 */
export declare const GethashString: (name: string) => string;
/**
 * 合并对象
 * @param { Array<any> } args 所有的参数   后面的参数替换前面的参数
 * @param sources 需要合并的对象
 */
export declare function mergeOptions(...sources: Array<any>): any;
/**
 * 递归替换
 * @param { Array<any> } args 所有的参数   后面的参数替换前面的参数
 * @return { object }
 * @example
 *  extend({a:1,b:2},{a:2,c:3}) =>  {a:2,b:2,c:3}
 */
export declare function extend(...args: Array<any>): any;
/**
 * 异步加载js文件
 * @param {Array<string>} fileAry js文件的数组
 */
export declare function addScriptLoad(fileAry: Array<string>): void;
/**
 * 请求回传的状态
 * @param {string} subCode 状态码
 * @return {boolean} true 成功 false 失败
 */
export declare function dataState(subCode: string): boolean;
/**
 * 把中英文的长度都转成字符串行的长度    中文：2个字符    英文：1个字符
 * @param {string} str
 */
export declare function strlen(str: string): number;
/**
 * 获取元素的下标
 * @param {Element} Ele 当前元素
 * @return {number} 元素的下标
 */
export declare function index(Ele: HTMLElement): number;
/**
 * 去掉字符串的前后空格
 * @param {string} value 字符串
 * @return {string} 去掉前后空格的字符串
 */
export declare function trim(value: string): string;
/**
 * 四舍五入保留几位小数点 toFixeds的兼容处理
 * @param {number|string} value  需要取余的数字
 * @param  {number|string} N  保留小数点后几位数
 * @return {string|null}  为null则val不是数字
 */
export declare function toFixeds(value: number | string, N: number | string): string;
/**
 * IE下的children兼容处理
 * @param {Element} element
 * @return {Array<Element>}
 */
export declare function getChildElementNodes(element: any): any;
