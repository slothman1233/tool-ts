/**
 * 右键操作
 * @param { Element | NodeList | Array<Element> | string} ele 右键元素
 * @param {Function} callback 右键后的回调
 * @param {object} data [{contentDom:contentDom,children:[]}]
        * @param {Element} contentDom 内容的元素
        * @param {object} children 子元素
        * @param {Function} callback(ele) 点击的回调
                * @param {Element} ele 当前右键的元素
 */
export declare function contextmenu(data: contextmenuData): void;
