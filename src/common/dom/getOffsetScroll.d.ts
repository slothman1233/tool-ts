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
