/**
 * 获取元素的偏移量 相对计算 相对于上一个定位元素的计算
 * @param {Node} Node 当前元素节点 
 * @param {Element} ele 终止的节点
 * @return {object} {top:top,left:left}
      * @param {number} top 元素节点离顶部的距离
      * @param {number} left 元素节点离左部的距离
 */
export function getOffset(Node: any, ele?: any) {
    let offset = { top: 0, left: 0 };
    offsets(Node, offset);
    function offsets(Node: any, offset: any): any {
      if ((ele && Node === ele) || Node == document.body || !Node) {
        //当该节点为body节点时，结束递归        
        return offset;
      }
      offset.top += Node.offsetTop;
      offset.left += Node.offsetLeft;
      return offsets(Node.offsetParent, offset);//向上累加offset里的值
    }
    return offset;
  }