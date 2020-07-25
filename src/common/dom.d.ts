/**
 * 是否是元素
 * @param {any} value 元素
 */
export declare function isEl(value?: any): boolean;
/**
   * 判断是否是文本
   * @param {any} value 内容
   */
export declare function isTextNode(value: any): boolean;
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
/**
 * 添加文本内容的兼容处理
 * @param {Element} el 需要添加文本的元素
 * @param {String} text 添加的文本
 * @return {Element} 元素
 */
export declare function textContent(el: any, text: string): any;
/**
 * 添加元素
 * @param {Element} el 父元素
 * @param {Array<Element> | Element} content 添加的元素
 * @return {Element} 父元素
 */
export declare function appendContent(el: any, content: any): any;
/**
 * 这是一个混合值，描述要注入到DOM中的内容
 * 通过某种方法。它可以是以下类型:
 * 输入     | 描述
 * string   | 值将被规范化为一个文本节点。
 * Element  | 值将按原样接受。
 * TextNode | 值将按原样接受。
 * Array    | 一维数组，包含字符串、元素、文本节点或函数。这些函数应该返回字符串、元素或文本节点(任何其他返回值，如数组，都将被忽略)。
 * Function |一个函数，它期望返回一个字符串、元素、文本节点或数组——上面描述的任何其他可能的值。这意味着内容描述符可以是返回函数数组的函数，但是这些二级函数必须返回字符串、元素或文本节点
 *
 * 规范化最终插入到DOM中的内容
 * 这允许广泛的内容定义方法，但有助于保护
 * 避免陷入简单编写“innerHTML”的陷阱，这是可能的成为XSS关注的对象。
 *
 * 元素的内容可以以多种类型传递
 * 组合，其行为如下:
 * @param {module:dom~ContentDescriptor} content
 * @return {Array}
 */
export declare function normalizeContent(content: any): any[];
/**
 * 类具有非法空格字符
 * @param {string} str 字符串
 * @return {boolean}
 */
export declare function throwIfWhitespace(str: string): void;
/**
 * 正则表达式化
 * @param {string} className 正则的匹配内容
 * @return {RegExp} 正则表达式对象
 */
export declare function classRegExp(className: string): RegExp;
/**
 * 检索元素的类中是否包含该类
 * @param {Element} element  查找的元素
 * @param {String} classToCheck 需要匹配的类
 * @return {boolean} true包含  false包含
 */
export declare function hasClass(element: any, classToCheck: string): any;
/**
 * 兼容table的innerHTML
 * @param {HTMLElement} table 需要赋值表格元素
 * @param {String} html 添加的内容
 * @return {HTMLElement} 返回table
 * @example setTableInnerHTML(document.createElement('table'),html) => table
 */
export declare function setTableInnerHTML(table: any, html: string): any;
/**
 * 显示当前元素
 * @param {Element|NodeList | Array<Element>} ele 需要显示的元素
 * @return {Element|NodeList | Array<Element>} 返回当前元素
 */
export declare function show(ele: any): any;
/**
 * 隐藏当前元素
 * @param {Element|NodeList | Array<Element>} ele 需要隐藏的元素
 * @return {Element|NodeList | Array<Element>} 返回当前元素
 */
export declare function hide(ele: any): any;
/**
 * 显示/隐藏元素
 * @param {Element} ele 需要隐藏的元素
 * @return {Element} 返回当前元素
 */
export declare function toggle(ele: any): void;
/**
 * 当前元素的同辈元素
 * @param {string | Element} ele 当前元素
 * @param {Function} callback 每个元素的回调方法
 * @return {Array<Element>} 返回对象数组
 * @example
 *    fx.siblings("sss" | document.querySelector("div") | document.querySelectorAll("div"))
 */
export declare function siblings(ele: string | Element, callback?: Function): Array<Element>;
/**
 * 删除元素的类
 * @param {Element} ele 元素
 * @param {string} className 类名
 * @return {Element}
 */
export declare function removeClass(ele: Element, className: string): Element;
/**
 * 添加元素的类
 * @param {Element} ele 元素
 * @param {string} className 类名
 * @return {Element}
 */
export declare function addClass(ele: Element, className: string): Element;
/**
 * 向当前元素的之后插入一个元素节点
 * @param {Node} newEl 插入的节点
 * @param {Node} targetEl 当前的节点
 * @return {Node} 返回插入的节点
 */
export declare function insertAfter(newEl: any, targetEl: any): any;
/**
 * 向当前元素的之前插入一个元素节点
 * @param {Node} newEl 插入的节点
 * @param {Node} targetEl 当前的节点
 * @return {Node} 返回插入的节点
 */
export declare function insertBefore(newEl: any, targetEl: any): any;
/**
 * 返回指定的父级元素
 * @param {Element} ele 当前元素
 * @param {string} tag 返回元素的名
 * @return {Element | null} 返回指定的元素，没有则返回null
 */
export declare function parent(ele: Element, tag: string): HTMLElement;
/**
 * 返回指定的父级元素集合
 * @param {Element} ele 当前元素
 * @param {string} tag 返回元素的名
 * @return {Element<Element|undefined>} 返回指定的元素集合，没有则返回[]
 */
export declare function parents(ele: Element, tag: string): any[];
/**
 * 获取元素的偏移量 相对计算 相对于上一个定位元素的计算
 * @param {Node} Node 当前元素节点
 * @param {Element} ele 终止的节点
 * @return {object} {top:top,left:left}
      * @param {number} top 元素节点离顶部的距离
      * @param {number} left 元素节点离左部的距离
 */
export declare function getOffset(Node: any, ele?: any): {
    top: number;
    left: number;
};
/**
 * 获取元素偏移的滚动条距离 相对计算 相对于上一个定位元素的计算
 * @param {Element} ele 当前元素
 * @return {object} {top:top,left:left}
      * @param {number} top 元素节点离顶部的滚动条距离
      * @param {number} left 元素节点离左部的滚动条距离
 */
export declare function getOffsetScroll(ele: any): {
    left: number;
    top: number;
};
/**
 * 获取元素偏移的滚动条距离 相对计算 相对于html的滚动条的距离
 * @param {Element} ele 当前元素
 * @return {object} {top:top,left:left}
      * @param {number} top 元素节点离顶部的滚动条距离
      * @param {number} left 元素节点离左部的滚动条距离
 */
export declare function AllScroll(ele: any): {
    left: number;
    top: number;
};
/**
 * 获取元素偏移的滚动条距离 绝对计算 相对于body的计算
 * @param {Element} ele 当前元素
 * @return {object} {top:top,left:left}
      * @param {number} top 元素节点离顶部的滚动条距离
      * @param {number} left 元素节点离左部的滚动条距离
 */
export declare function getoffsetAndScroll(ele: any): {
    left: number;
    top: number;
};
/**
* 数组元素交换位置
* @param {array} arr 数组
* @param {number} index1 添加项目的位置
* @param {number} index2 删除项目的位置
* @return {array} 返回交换后的数组
* index1和index2分别是两个数组的索引值，即是两个要交换元素位置的索引值，如1，5就是数组中下标为1和5的两个元素交换位置
*/
export declare function swapArray(arr: Array<any>, index1: number, index2: number): any[];
/**
 * 删除元素 兼容IE
 * @param {Element} ele 需要删除的元素
 */
export declare function remove(ele: any): void;
/**
 * 返回指定的子级元素集合
 * @param {Element} ele 当前元素
 * @param {string} tag 返回元素的名
 * @return {Element<Element|undefined>} 返回指定的元素集合，没有则返回[]
 */
export declare function find(ele: any, tag: string): any[];
