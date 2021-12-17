/**
 * 解析出属性名称和值
 * @param {string} str [data-id=11]  [data-id] [data-id='a']
 * @return {Array<string>} [0]属性名称 [1]属性值 之不存在为null
 */
export function getTagName(str:string) {
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