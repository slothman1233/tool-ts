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
