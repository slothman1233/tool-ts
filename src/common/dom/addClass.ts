import { getDataType } from "./../obj/getDataType";
import fxLanguage from "../../languages/cn";
/**
 * 添加元素的类
 * @param {Element} ele 元素
 * @param {string} className 类名
 * @return {Element}
 */
export function addClass(ele: Element, className: string): Element {
    let type = getDataType(ele);
    if (!/\[object HTML.*Element\]/.test(type)) {
      throw new Error(`${fxLanguage.dom.notElement}`)
    }
  
    let classAry = ele.className.split(" ");
    if (classAry.indexOf(className) === -1) classAry.push(className);
    ele.className = classAry.join(" ");
    return ele;
  }