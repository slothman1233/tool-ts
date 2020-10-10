
import { isString} from './../obj/isString';
import { getTagName } from "./getTagName";
/**
 * 获取指定的所有对象
 * @param {String} str 元素的字符串名称
 * @return {Array<Element>} 返回对象的数组
 */
export function dom(str: any) {
    if (!str || str.length <= 0) return "";
    if (/\[object HTML.*Element\]/.test(Object.prototype.toString.call(str))) return str;
    if (isString(str)) {
        if (str === "window") return window
        if (str === "document") return document

        if (str.indexOf('[') >= 0 && str.indexOf(']') > 0) {
            let strAry = getTagName(str.slice(str.indexOf('[')));
            if (strAry[1] !== null) {
                let strValue = `'${strAry[1]}'`;
                str = str.slice(0, str.indexOf('[')) + "[" + strAry[0] + "=" + strValue + "]";
            }

        }


        return document.querySelectorAll(str)
    } else {
        return str
    }
}