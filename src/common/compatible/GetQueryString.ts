/**
 * 获取链接的参数
 * @param {String} name 参数名
 * @return {String} 对应参数名的值  不存在返回null
 */
export const GetQueryString = function (name: string) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return r[2];
    return null;
  }