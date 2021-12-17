/**
 * 获取元素偏移的滚动条距离 绝对计算 相对于body的计算
 * @param {Element} ele 当前元素
 * @return {object} {top:top,left:left}
      * @param {number} top 元素节点离顶部的滚动条距离
      * @param {number} left 元素节点离左部的滚动条距离
 */
export function getoffsetAndScroll(ele: any) {
    var scroll = { left: 0, top: 0 };
  
    while (ele) {
      if (ele !== document.body) {
        scroll.top += ele.offsetTop - ele.scrollTop;
        scroll.left += ele.offsetLeft - ele.scrollLeft;
      }
      ele = ele.offsetParent;
    }
    // scroll.top += document.querySelector("html").scrollTop + document.querySelector("body").scrollTop;
    // scroll.left += document.querySelector("html").scrollLeft + document.querySelector("body").scrollLeft;
  
    return scroll
  }