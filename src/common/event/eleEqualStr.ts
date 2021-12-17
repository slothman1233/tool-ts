
import { hasClass } from './../dom/hasClass';
/**
 * 元素是否是str所值的元素
 * @param {Element} ele 比对的元素
 * @param {String} str  元素的字符串  #id   .class  aa[data-id=aa] [data-id]
 */
export function eleEqualStr(ele:any, str:string) {
    let eleString = str;
    //判断属性是否相同
    //判断 [data-id] [data-id=aa] 是否正确
    if (str.indexOf("[") >= 0 && str.indexOf("]") > 0) {
        let isb = onlyAttrbuite();
        if (!isb) return false;

        //[data-id] [data-id=aa]
        if (str.indexOf("[") == 0 && str.indexOf("]") === str.length - 1 && isb) return true;

        eleString = str.slice(0, str.indexOf("["));
    }

    //id的情况
    if (eleString.charAt(0) === "#" && ele.id === eleString.slice(1)) {
        return true;
        //class的情况
    } else if (eleString.charAt(0) === "." && hasClass(ele, eleString.slice(1))) {
        return true;
        //标签的情况
    } else if (ele.nodeName && ele.nodeName.toUpperCase() === str.toUpperCase()) {
        return true;
    }

    //判断 [data-id] [data-id=aa] 是否正确
    function onlyAttrbuite() {
        let ary = getTagName(str.slice(str.indexOf("[")));

        //[data-id]
        if (ele.getAttribute(ary[0]) && ary[1] === null) return true;

        // [data-id=aa]
        if (ary[1] && ele.getAttribute(ary[0]) && ele.getAttribute(ary[0]) === ary[1]) return true;

        return false;
    }

    return false;

}
/**
 * 解析出属性名称和值
 * @param {string} str [data-id=11]  [data-id] [data-id='a']
 * @return {Array<string>} [0]属性名称 [1]属性值 之不存在为null
 */
function getTagName(str:string) {
    if (str.charAt(0) === "[" && str.indexOf(']') === str.length - 1) {
        str = str.slice(1, -1);
    }

    let strAry = str.split("=");
    if (strAry.length === 2) {
        if (strAry[1].charAt(0) === "'" || strAry[1].charAt(0) === '"') {
            strAry[1] = strAry[1].slice(1, -1);
        }
        return strAry;
    }
    strAry.push(null);
    return strAry
}