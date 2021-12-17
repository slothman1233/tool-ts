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