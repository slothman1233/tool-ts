///<reference path="../../indexModel.d.ts" />
import { dom } from "./dom";
import { removeEvent } from './../compatible/removeEvent';
function LoopBinding(ele:any, cb:Function) {
    if (/\[object HTML.*Element\]/.test(ele)) ele = [ele];
    for (let i = 0; i < ele.length; i++) {
        (function (i) { cb(i); })(i)
    }
}
/**
 * 解除绑定
 * @param {listenDataModel} data 
    * @param {String | Element} agent 代理对象
    * @param {Stirng} events 触发的方法
    * @param {Stirng} ele 事件对象
    * @param {Function} fn 事件方法
 * @return {Element} 事件对象
 * @example
 *      fx.off({
    *          agent:document,
    *          events:"click",
    *          ele:".aa",
    *          fn:function(){fx.log(1)}
    *          })
    */
   export function off(data: listenDataModel) {
    let agentDom = Object.prototype.toString.call(data.agent) === "[object String]"?dom(data.agent)[0]:data.agent;
    let events = dom(data.ele);
    //有代理元素
    if (data.agent) {
        removeEvent(agentDom, data.events, data.fn);
    } else { //没有代理元素的情况
        LoopBinding(events, function (i:any) {
            removeEvent(events[i], data.events, data.fn)
        })

    }
}