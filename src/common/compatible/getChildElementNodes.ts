/**
 * IE下的children兼容处理
 * @param {Element} element 
 * @return {Array<Element>}
 */
export function getChildElementNodes(element: any) {
    //第一步是条件语句来判断浏览器是否支持element.children属性
    //如果支持呢，element.children的值是一个集合而不是undefined
    if (element.children == "undefined" || element.children == undefined) {
      // 既然没有，自己为element元素创建一个children属性，并把函数returnEle的返回值给这个属性
      element.children = returnEle();
    }
    return element.children;
    //element.children等号右边要进行的逻辑操作
    function returnEle() {
      var childNodes,
        EleNodes = [],
        i = 0,
        // 等号右边获取的所有节点类型全部赋值给EleNodes这个变量
        childNodes = element.childNodes;
      //现在要为childNodes里面的节点做循环判断了，我们只要元素节点
      for (var i = 0; i < childNodes.length; i++) {
        // 判断节点是不是元素节点想到了两种方法
        // childNodes[i].nodeType === 1
        if (/\[object HTML.*Element\]/.test(Object.prototype.toString.call(childNodes[i]))
          || (childNodes[i].nodeName === "#text" && childNodes[i].length > 0)
        ) {
          EleNodes.push(childNodes[i]);
        }
      }
      return EleNodes;
    }
  }