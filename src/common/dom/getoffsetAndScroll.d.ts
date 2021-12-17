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
