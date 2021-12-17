///<reference path="../../indexModel.d.ts" />
import { dom } from "./dom";
import { addEvent } from './../compatible/addEvent';
import { NodeListToArray } from './../obj/NodeListToArray';
import { eventsPath } from "./eventsPath";
import { installEvents } from "./../subscrible";
let event = installEvents();       //没有代理对象的缓存
 
function LoopBinding(ele:any, cb:Function) {
    if (/\[object HTML.*Element\]/.test(ele)) ele = [ele];
    for (let i = 0; i < ele.length; i++) {
        (function (i) { cb(i); })(i)
    }
}
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
export function on(data: listenDataModel) {

    if (!data.fn) return;

    let agentDom = dom(data.agent);
    let events = dom(data.ele);
    //有代理元素
    if (data.agent) {
        if (agentDom)
            if (/\[object HTML.*Element\]/.test(agentDom)) agentDom = [agentDom];
        (function (data) {
            LoopBinding(agentDom, function (i:any) {

                addEvent(agentDom[i], data.events, function (e:any) {
                    let ev = e || event;
                    let path = eventsPath(ev);
                    for (let i = 0; i < path.length; i++) {
                        if (path[i] === this) return;
                        if (path[i].nodeName === "#document") return;
                        if (NodeListToArray((<HTMLElement>this).querySelectorAll(data.ele)).indexOf(path[i]) >= 0) {
                            data.fn(path[i], ev);
                        }
                    }

                });
            })
        })(data)
    } else { //没有代理元素的情况
        if (/\[object HTML.*Element\]/.test(events)) events = [events];
        (function (data) {
            LoopBinding(events, function (i:any) {
                addEvent(events[i], data.events, function (e:any) {
                    let ev = e || event;
                    let path = eventsPath(ev);
                    data.fn(path, ev);
                });
            })

        })(data)
    }
}