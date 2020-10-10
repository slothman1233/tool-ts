import { eleEqualStr } from './../event/eleEqualStr';
/**
 * 返回指定的父级元素
 * @param {Element} ele 当前元素
 * @param {string} tag 返回元素的名
 * @return {Element | null} 返回指定的元素，没有则返回null
 */
export function parent(ele: Element, tag: string) {
    if (!tag || tag.length <= 0) return null;
    let d = ele.parentElement;
  
    do {
      if (eleEqualStr(d, tag)) {
        return d;
      }
      if (d.nodeName === "HTML") return null;
      d = d.parentElement;
    } while (d)
  
    return null;
  }