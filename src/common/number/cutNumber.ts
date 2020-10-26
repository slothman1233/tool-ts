/**
 * 格式化数字（每三位加逗号）
 * @param {Number} num 需要格式化的数字
 * @return {String}  处理好的数字
 */
export function cutNumber(num:number):string{
    let val:Array<string> = (num || 0).toString().split(".");
    return val.length>1?val[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')+"."+val[1]:val[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}