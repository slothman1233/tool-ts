import { getDataType } from "./../obj/getDataType";
import fxLanguage from "../../languages/cn";
/**
 * 当前元素的同辈元素
 * @param {string | Element} ele 当前元素
 * @param {Function} callback 每个元素的回调方法
 * @return {Array<Element>} 返回对象数组
 * @example
 *    fx.siblings("sss" | document.querySelector("div") | document.querySelectorAll("div"))  
 */
export function siblings(ele: string | Element, callback?: Function): Array<Element> {
    let e: any = ele;
    let r = [];
    let type = getDataType(ele);
    switch (type) {
      case "[object String]":
        e = document.querySelector(<string>ele);
        break;
      case "[object NodeList]":
        e = (<any>ele)[0];
        break;
      default:
        if (/\[object HTML.*Element\]/.test(type)) {
          e = ele;
        } else {
          throw new Error(`${fxLanguage.dom.notElement}`)
        }
  
    }
  
    var n = e.parentNode.firstChild;
    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== e) {
        callback && callback(n);
        r.push(n);
      }
    }
  
    return r;
  }