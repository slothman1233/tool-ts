import { installEvents } from "./../subscrible";
let event = installEvents();       //没有代理对象的缓存
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