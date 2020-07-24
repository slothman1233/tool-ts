
import { installEvents } from "./subscrible";
import { addEvent, removeEvent } from './compatible';
import { isString, NodeListToArray } from './obj';
import { hasClass } from './dom';
let event = installEvents();       //没有代理对象的缓存


function LoopBinding(ele:any, cb:Function) {
    if (/\[object HTML.*Element\]/.test(ele)) ele = [ele];
    for (let i = 0; i < ele.length; i++) {
        (function (i) { cb(i); })(i)
    }
}


/**
 * 元素是否是str所值的元素
 * @param {Element} ele 比对的元素
 * @param {String} str  元素的字符串  #id   .class  aa[data-id=aa] [data-id]
 */
export function eleEqualStr(ele:any, str:string) {
    let eleString = str;
    //判断属性是否相同
    //判断 [data-id] [data-id=aa] 是否正确
    if (str.indexOf("[") >= 0 && str.indexOf("]") > 0) {
        let isb = onlyAttrbuite();
        if (!isb) return false;

        //[data-id] [data-id=aa]
        if (str.indexOf("[") == 0 && str.indexOf("]") === str.length - 1 && isb) return true;

        eleString = str.slice(0, str.indexOf("["));
    }

    //id的情况
    if (eleString.charAt(0) === "#" && ele.id === eleString.slice(1)) {
        return true;
        //class的情况
    } else if (eleString.charAt(0) === "." && hasClass(ele, eleString.slice(1))) {
        return true;
        //标签的情况
    } else if (ele.nodeName && ele.nodeName.toUpperCase() === str.toUpperCase()) {
        return true;
    }

    //判断 [data-id] [data-id=aa] 是否正确
    function onlyAttrbuite() {
        let ary = getTagName(str.slice(str.indexOf("[")));

        //[data-id]
        if (ele.getAttribute(ary[0]) && ary[1] === null) return true;

        // [data-id=aa]
        if (ary[1] && ele.getAttribute(ary[0]) && ele.getAttribute(ary[0]) === ary[1]) return true;

        return false;
    }

    return false;

}

/**
 * 解析出属性名称和值
 * @param {string} str [data-id=11]  [data-id] [data-id='a']
 * @return {Array<string>} [0]属性名称 [1]属性值 之不存在为null
 */
function getTagName(str:string) {
    if (str.charAt(0) === "[" && str.indexOf(']') === str.length - 1) {
        str = str.slice(1, -1);
    }

    let strAry = str.split("=");
    if (strAry.length === 2) {
        if (strAry[1].charAt(0) === "'" || strAry[1].charAt(0) === '"') {
            strAry[1] = strAry[1].slice(1, -1);
        }
        return strAry;
    }
    strAry.push(null);
    return strAry
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
    let agentDom = dom(data.agent);
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

/**
 * 兼容 e.path方法
 * @param {Event} e 需要获取的指针 
 */
export function eventsPath(e:any) {
    let ev = e || event;
    if (ev.path || ev.composedPath) return ev.path || (ev.composedPath && ev.composedPath());
    let Ary = [];
    let ele: HTMLElement = ev.target || ev.srcElement;

    while (ele) {
        Ary.push(ele);
        ele = ele.parentElement;
    }


    return Ary
}

/**
 * 获取指定的所有对象
 * @param {String} str 元素的字符串名称
 * @return {Array<Element>} 返回对象的数组
 */
export function dom(str: any) {
    if (!str || str.length <= 0) return "";
    if (/\[object HTML.*Element\]/.test(Object.prototype.toString.call(str))) return str;
    if (isString(str)) {
        if (str === "window") return window
        if (str === "document") return document

        if (str.indexOf('[') >= 0 && str.indexOf(']') > 0) {
            let strAry = getTagName(str.slice(str.indexOf('[')));
            if (strAry[1] !== null) {
                let strValue = `'${strAry[1]}'`;
                str = str.slice(0, str.indexOf('[')) + "[" + strAry[0] + "=" + strValue + "]";
            }

        }


        return document.querySelectorAll(str)
    } else {
        return str
    }
}

/**
 * 只执行一次的放
 * @param {Element} dom  元素
 * @param {String} event  方法名称
 * @param {Function} callback 执行的方法
 */
export function once(dom:any, event:string, callback:Function) {
    var handle = function () {
        callback();
        dom.removeEventListener(event, handle);
    }
    dom.addEventListener(event, handle)
}

