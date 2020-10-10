/**
 * 把中英文的长度都转成字符串行的长度    中文：2个字符    英文：1个字符 
 * @param {string} str 
 */
export function strlen(str: string) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
      var c = str.charCodeAt(i);
      //单字节加1   
      if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
        len++;
      }
      else {
        len += 2;
      }
    }
    return len;
  }