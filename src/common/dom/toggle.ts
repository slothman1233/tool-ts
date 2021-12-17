import { isEl } from "./isEl";
import { computedStyle } from "./../computed-style";
import fxLanguage from "../../languages/cn";
/**
 * 显示/隐藏元素
 * @param {Element} ele 需要隐藏的元素
 * @return {Element} 返回当前元素
 */
export function toggle(ele: any) {
    if (!isEl(ele)) throw new Error(`${fxLanguage.dom.notElement}`)
    ele.style.display = computedStyle(ele, "display") !== "none" ? "none" : "block";
  }