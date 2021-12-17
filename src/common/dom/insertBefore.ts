
/**
 * 向当前元素的之前插入一个元素节点
 * @param {Node} newEl 插入的节点
 * @param {Node} targetEl 当前的节点
 * @return {Node} 返回插入的节点
 */
export function insertBefore(newEl: any, targetEl: any) {
    // let parentEl = targetEl.parentNode;
  
    targetEl.insertAdjacentElement("beforeBegin", newEl);
  
    //parentEl.insertBefore(newEl, targetEl);
  
    return newEl;
  }