import { getDataType } from "./../obj/getDataType";
import { computedStyle } from "./../computed-style";
import fxLanguage from "../../languages/cn";
/**
 * 隐藏当前元素
 * @param {Element|NodeList | Array<Element>} ele 需要隐藏的元素
 * @return {Element|NodeList | Array<Element>} 返回当前元素
 */
export function hide(ele: any) {
    let e = ele;
    let type = getDataType(ele);
  
    switch (type) {
      case "[object String]":
      case "[object NodeList]":
      case "[object Array]":
        for (let i = 0; i < e.length; i++) {
          if (computedStyle(e[i], "display") !== "none") e[i].style.display = "none"
        }
        break;
      default:
        if (/\[object HTML.*Element\]/.test(type)) {
          if (computedStyle(ele, "display") !== "none") ele.style.display = "none"
        } else {
          throw new Error(`${fxLanguage.dom.notElement}`)
        }
  
    }
    return ele;
  }