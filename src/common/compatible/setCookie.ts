/**
 * 写入cookie
 * @param {String} name  cookie名
 * @param {String} value cookie值
 * @param {String} time  存储时间 收一个字符是代表的时间名词
                        s20是代表20秒
                        h是指小时，如12小时则是：h12
                        d是天数，30天则：d30
 */
export const setCookie = function (name: string, value: string, time: string) {
    var strsec = getsec(time);
    var exp: any = new Date();
    exp.setTime(exp.getTime() + strsec * 1);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
  }
  function getsec(str: string) {
    var str1: number = parseFloat(str.substring(1, str.length));
    var str2: string = str.substring(0, 1);
    switch (str2) {
      case "s": return str1 * 1000;
      case "m": return str1 * 60 * 1000;
      case "h": return str1 * 60 * 60 * 1000;
      default: return str1 * 24 * 60 * 60 * 1000;
    }
  }