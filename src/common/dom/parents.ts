import { eleEqualStr } from './../event/eleEqualStr';
/**
 * 返回指定的父级元素集合
 * @param {Element} ele 当前元素
 * @param {string} tag 返回元素的名
 * @return {Element<Element|undefined>} 返回指定的元素集合，没有则返回[]
 */
export function parents(ele: Element, tag: string) {
    let d = ele.parentElement, eleAry: Array<any> = [];
    if (!tag || tag.length <= 0) return eleAry;
  
    do {
      if (eleEqualStr(d, tag)) {
        eleAry.push(d);
      }
      if (d.nodeName === "HTML") return eleAry;
      d = d.parentElement;
    } while (d)
  
    return eleAry;
  }