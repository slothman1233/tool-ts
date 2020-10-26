/**
 * 格式化数字（添加单位）
 * @param {Number} num 需要格式化的数字
 * @param {Number} point 需要保留的小数位数 没有则传0
 * @param {Array} unit 需要添加的单位列表 如["万","亿"]  可传单位："百","千","万","十万","百万","千万","亿"
 * @param {Boolean} tofixe 是否需要四舍五入  默认为true，传false时则向下保留小数
 * * @return {String}  处理好的数字
 */
export function tranNumber(num:number,point:number,unit:Array<string>,tofixe:boolean = true):string{
    let len:number = num.toString().split(".")[0].length;
    if(len>8&&unit.indexOf("亿")>=0)
        return tofixe?Math.round((num/1e8)*Math.pow(10,point))/Math.pow(10,point)+"亿":Math.floor((num/1e8)*Math.pow(10,point))/Math.pow(10,point)+"亿";
    if(len>7&&unit.indexOf("千万")>=0)
        return tofixe?Math.round((num/1e7)*Math.pow(10,point))/Math.pow(10,point)+"千万":Math.floor((num/1e7)*Math.pow(10,point))/Math.pow(10,point)+"千万";
    if(len>6&&unit.indexOf("百万")>=0)
        return tofixe?Math.round((num/1e6)*Math.pow(10,point))/Math.pow(10,point)+"百万":Math.floor((num/1e6)*Math.pow(10,point))/Math.pow(10,point)+"百万";
    if(len>5&&unit.indexOf("十万")>=0)
        return tofixe?Math.round((num/1e5)*Math.pow(10,point))/Math.pow(10,point)+"十万":Math.floor((num/1e5)*Math.pow(10,point))/Math.pow(10,point)+"十万";
    if(len>4&&unit.indexOf("万")>=0)
        return tofixe?Math.round((num/1e4)*Math.pow(10,point))/Math.pow(10,point)+"万":Math.floor((num/1e4)*Math.pow(10,point))/Math.pow(10,point)+"万";
    if(len>3&&unit.indexOf("千")>=0)
        return tofixe?Math.round((num/1e3)*Math.pow(10,point))/Math.pow(10,point)+"千":Math.floor((num/1e3)*Math.pow(10,point))/Math.pow(10,point)+"千";
    if(len>2&&unit.indexOf("百")>=0)
        return tofixe?Math.round((num/1e2)*Math.pow(10,point))/Math.pow(10,point)+"百":Math.floor((num/1e2)*Math.pow(10,point))/Math.pow(10,point)+"百";
    return tofixe?Math.round((num)*Math.pow(10,point))/Math.pow(10,point)+"":Math.floor((num)*Math.pow(10,point))/Math.pow(10,point)+"";
}