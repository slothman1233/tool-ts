/// <reference path="../../indexModel.d.ts" />
/**
 * 绑定方法
 * @param {listenDataModel} data
    * @param {String | Element} agent 代理对象
    * @param {Stirng} events 触发的方法
    * @param {Stirng} ele 事件对象
    * @param {Function} fn 事件方法
 * @return {Element} 事件对象
 * @example
 *      fx.on({
 *          agent:document,
 *          events:"click",
 *          ele:".aa",
 *          fn:function(){fx.log(1)}
 *          })
 */
export declare function on(data: listenDataModel): void;
