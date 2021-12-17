/**
 * 四舍五入保留几位小数点 toFixeds的兼容处理
 * @param {number|string} value  需要取余的数字
 * @param  {number|string} N  保留小数点后几位数
 * @return {string|null}  为null则val不是数字
 */
export function toFixeds(value: number | string, N: number | string) {
    if (isNaN(parseInt(value + ""))) return null;
  
    var val: string = value.toString();
    //有小数点
    var isSpot = function () {
      var n = parseFloat(N + ""), v = val.toString(), last = v.slice(v.indexOf('.') + 1 + n, v.indexOf('.') + 2 + n);
      if (parseInt(last) == 5) {
  
        v = v.substr(0, v.indexOf('.') + 1 + n) + 6
      }
      else {
        v = v.substr(0, v.indexOf('.') + 2 + n)
  
      }
      return parseFloat(v).toFixed(n);
    }
  
    // 补足小数点后天的位数
    var InsufficientFigures = function (v: string) {
      var i = parseFloat(N + "") - v.slice(v.indexOf('.') + 1).length;
      while (i > 0) {
        v += '0';
        i--;
      }
      return v;
    }
  
    if (val.indexOf('.') >= 0) {
  
      if (val.slice(val.indexOf('.') + 1).length > N) {
        return isSpot();
      }
      else {
        return InsufficientFigures(val);
      }
    }
    else {
      return InsufficientFigures(val + '.0');
    }
  }