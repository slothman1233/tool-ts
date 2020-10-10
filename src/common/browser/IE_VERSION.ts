import { USER_AGENT }from "./USER_AGENT";
/**
 * IE的版本号 没有则返回-1
 *
 * @return {Number|String|null}
        -1 不是ie浏览器 Number
         6/7/8/9/10/11 浏览器的版本 Number
         'edge'  ie的edge浏览器 String
 */
export const IE_VERSION: Number | String | null = (function () {
    var isIE = USER_AGENT.indexOf("compatible") > -1 && USER_AGENT.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
    var isEdge = USER_AGENT.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
    var isIE11 = USER_AGENT.indexOf('Trident') > -1 && USER_AGENT.indexOf("rv:11.0") > -1;
    if (isIE) {
      var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
      reIE.test(USER_AGENT);
      var fIEVersion = parseFloat(RegExp["$1"]);
      if (fIEVersion == 7) {
        return 7;
      } else if (fIEVersion == 8) {
        return 8;
      } else if (fIEVersion == 9) {
        return 9;
      } else if (fIEVersion == 10) {
        return 10;
      } else {
        return 6;//IE版本<=7
      }
    } else if (isEdge) {
      return 'edge';//edge
    } else if (isIE11) {
      return 11; //IE11  
    } else {
      return -1;//不是ie浏览器
    }
  }());