///<reference path="../../indexModel.d.ts" />
/**
 * NodeList转为数组
 * @param {NodeList} nodes 对象数组类型
 * @return {Array} 转化后的数组
 */
export function NodeListToArray(nodes:NodeList) {
    var array = null;
    try {
      array = Array.prototype.slice.call(nodes, 0);
    } catch (ex) {
      array = new Array();
      for (var i = 0, len = nodes.length; i < len; i++) {
        array.push(nodes[i]);
      }
    }
  
    return array;
  }