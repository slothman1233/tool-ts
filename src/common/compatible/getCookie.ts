/**
 * 获取cookie里面的值
 * @param {String} name cookie名称
 * @param {String} 对应cookie名称的值  不存在返回null
 */
export const getCookie = function (name: string) {
    try {
      var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if (arr = document.cookie.match(reg)) {
        //  return unescape(arr[2]);
        return decodeURIComponent(arr[2]);
      } else {
        return null;
      }
    } catch (e) { return null; }
  }