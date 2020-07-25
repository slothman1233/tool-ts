/**
 * 发布订阅模式
 */
declare class events {
    clientList: any;
    constructor();
    /**
* 添加订阅者
* @param {string} key 订阅名称
* @param {Function} fn 订阅的函数
*/
    listen(key: string, fn: Function): void;
    /**
     * 发送消息
     * @param {string} key 订阅名称
     * @param {any} arg 函数的参数
     */
    trigger(key: string, ...arg: Array<any>): void;
    /**
     * 取消订阅事件
     * @param {string} key 订阅名称
     * @param {function} fn 取消的函数 不传等于清空里面的所有的方法
     */
    remove(key: string, fn?: Function): void;
}
/**
 * 动态安装 发布-订阅功能
 */
export declare let installEvents: () => events;
export {};
