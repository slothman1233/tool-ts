/**
 * 删除元素 兼容IE
 * @param {Element} ele 需要删除的元素
 */
export function remove(ele: any) {

    if (ele.removeNode) {
      ele.removeNode(true);
    } else {
      ele.remove();
    }
  }