/**
 * 元素是否是str所值的元素
 * @param {Element} ele 比对的元素
 * @param {String} str  元素的字符串  #id   .class  aa[data-id=aa] [data-id]
 */
export declare function eleEqualStr(ele: any, str: string): boolean;
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
export declare function off(data: listenDataModel): void;
/**
 * 兼容 e.path方法
 * @param {Event} e 需要获取的指针
 */
export declare function eventsPath(e: any): any;
/**
 * 获取指定的所有对象
 * @param {String} str 元素的字符串名称
 * @return {Array<Element>} 返回对象的数组
 */
export declare function dom(str: any): any;
/**
 * 只执行一次的放
 * @param {Element} dom  元素
 * @param {String} event  方法名称
 * @param {Function} callback 执行的方法
 */
export declare function once(dom: any, event: string, callback: Function): void;
