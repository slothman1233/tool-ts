/**
 * 获取元素偏移的滚动条距离 相对计算 相对于html的滚动条的距离
 * @param {Element} ele 当前元素
 * @return {object} {top:top,left:left}
      * @param {number} top 元素节点离顶部的滚动条距离
      * @param {number} left 元素节点离左部的滚动条距离
 */
export function AllScroll(ele: any) {
    let scroll = { left: 0, top: 0 }
    while (ele) {
      scroll.top += ele.scrollTop;
      scroll.left += ele.scrollLeft;
      ele = ele.parentElement;
    }
    return scroll;
  }
  