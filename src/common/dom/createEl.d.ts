/**
 * 传一个元素
 * @param {String} tagName 标签
 * @param properties 标签里面的文本内容
        {
            className: 'vjs-seek-to-live-text',
            innerHTML: this.localize('LIVE')
        }
 * @param {Object} attributes  添加属性
 * @param {Array<Element> | Element} content 标签里面添加元素
 * @return {Element} 返回添加的元素
 *
 * @or
 * 只传入一个参数
 * @param {String} tagName html代码
 * @return {Element} 返回需要创建的html代码的元素
 * @example
        createEl("<div>adsffadf</div>")
 */
export declare function createEl(tagName?: string, ...arg: Array<any>): Element;
