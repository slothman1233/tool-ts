/**
 * 获取链接hash后面的参数
 * @param {String} name hash名称
 * @param {String} 对应的hash名称的值
 */
export const GethashString = function (name: string) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var h = window.location.hash;
    var r = h.substr(h.lastIndexOf('?') + 1).match(reg);
    if (r != null) return r[2];
    return null;
  }