
import { isObject, getDataType } from './obj';
import { computedStyle } from './computed-style';
import { eleEqualStr } from './event';
import fxLanguage from "../languages/cn"

/**
 * 是否是元素
 * @param {any} value 元素
 */
export function isEl(value?: any) {
  return value && isObject(value) && value.nodeType === 1;
}

/**
   * 判断是否是文本
   * @param {any} value 内容
   */
export function isTextNode(value: any) {
  return isObject(value) && value.nodeType === 3;
}

/**
 * 传一个元素
 * @param {String} tagName 标签
 * @param properties 标签里面的文本内容
        {
            className: 'vjs-seek-to-live-text',
            innerHTML: this.localize('LIVE')
        }
 * @param {Object} attributes  添加属性
 * @param {Array<Element> | Element} content 标签里面添加元素
 * @return {Element} 返回添加的元素
 * 
 * @or
 * 只传入一个参数 
 * @param {String} tagName html代码
 * @return {Element} 返回需要创建的html代码的元素
 * @example
        createEl("<div>adsffadf</div>")
 */
export function createEl(tagName: string = 'div', ...arg: Array<any>) {
  if (arg.length === 0) {
    let ele = document.createElement("div");
    ele.innerHTML = tagName;
    return ele.firstElementChild;
  } else {
    let properties = arg[0] || {};
    let attributes = arg[1] || {};
    let content = arg[2];
    const el: HTMLElement = document.createElement(tagName);

    Object.getOwnPropertyNames(properties).forEach(function (propName: string) {
      const val = properties[propName];

      if (propName === 'textContent') {
        textContent(el, val);
      } else {
        (<any>el)[propName] = val;
      }
    });

    Object.getOwnPropertyNames(attributes).forEach(function (attrName) {
      el.setAttribute(attrName, attributes[attrName]);
    });

    if (content) {
      appendContent(el, content);
    }

    return el;
  }
}

/**
 * 添加文本内容的兼容处理
 * @param {Element} el 需要添加文本的元素 
 * @param {String} text 添加的文本 
 * @return {Element} 元素
 */
export function textContent(el: any, text: string) {
  if (typeof el.textContent === 'undefined') {
    el.innerText = text;
  } else {
    el.textContent = text;
  }
  return el;
}

/**
 * 添加元素
 * @param {Element} el 父元素
 * @param {Array<Element> | Element} content 添加的元素 
 * @return {Element} 父元素
 */
export function appendContent(el: any, content: any) {
  normalizeContent(content).forEach(node => el.appendChild(node));
  return el;
}

/**
 * 这是一个混合值，描述要注入到DOM中的内容
 * 通过某种方法。它可以是以下类型:
 * 输入     | 描述
 * string   | 值将被规范化为一个文本节点。
 * Element  | 值将按原样接受。
 * TextNode | 值将按原样接受。
 * Array    | 一维数组，包含字符串、元素、文本节点或函数。这些函数应该返回字符串、元素或文本节点(任何其他返回值，如数组，都将被忽略)。
 * Function |一个函数，它期望返回一个字符串、元素、文本节点或数组——上面描述的任何其他可能的值。这意味着内容描述符可以是返回函数数组的函数，但是这些二级函数必须返回字符串、元素或文本节点
 * 
 * 规范化最终插入到DOM中的内容
 * 这允许广泛的内容定义方法，但有助于保护
 * 避免陷入简单编写“innerHTML”的陷阱，这是可能的成为XSS关注的对象。
 *
 * 元素的内容可以以多种类型传递
 * 组合，其行为如下:
 * @param {module:dom~ContentDescriptor} content
 * @return {Array}
 */
export function normalizeContent(content: any) {

  if (typeof content === 'function') {
    content = content();
  }

  return (Array.isArray(content) ? content : [content]).map(value => {

    if (typeof value === 'function') {
      value = value();
    }

    if (isEl(value) || isTextNode(value)) {
      return value;
    }

    if (typeof value === 'string' && (/\S/).test(value)) {
      return document.createTextNode(value);
    }
  }).filter(value => value);
}

/**
 * 类具有非法空格字符
 * @param {string} str 字符串 
 * @return {boolean}  
 */
export function throwIfWhitespace(str: string) {
  if ((/\s/).test(str)) {
    throw new Error(`${fxLanguage.dom.throwWhitespace}`);
  }
}

/**
 * 正则表达式化
 * @param {string} className 正则的匹配内容
 * @return {RegExp} 正则表达式对象
 */
export function classRegExp(className: string) {
  return new RegExp('(^|\\s)' + className + '($|\\s)');
}

/**
 * 检索元素的类中是否包含该类
 * @param {Element} element  查找的元素
 * @param {String} classToCheck 需要匹配的类
 * @return {boolean} true包含  false包含
 */
export function hasClass(element: any, classToCheck: string) {
  if (!element) return false;
  throwIfWhitespace(classToCheck);
  if (element.classList) {
    return element.classList.contains(classToCheck);
  }
  return classRegExp(classToCheck).test(element.className);
}


/**
 * 兼容table的innerHTML
 * @param {HTMLElement} table 需要赋值表格元素
 * @param {String} html 添加的内容
 * @return {HTMLElement} 返回table
 * @example setTableInnerHTML(document.createElement('table'),html) => table
 */
export function setTableInnerHTML(table: any, html: string) {
  if (navigator && navigator.userAgent.match(/msie/i)) {
    var temp = table.ownerDocument.createElement('div');
    temp.innerHTML = '<table><tbody>' + html + '</tbody></table>';
    if (table.tBodies.length == 0) {
      var tbody = document.createElement("tbody");
      table.appendChild(tbody);
    }
    table.replaceChild(temp.firstChild.firstChild, table.tBodies[0]);
  } else {
    table.innerHTML = html;
  }
  return table
}

/**
 * 显示当前元素
 * @param {Element|NodeList | Array<Element>} ele 需要显示的元素
 * @return {Element|NodeList | Array<Element>} 返回当前元素
 */
export function show(ele: any) {
  let e = ele;
  let type = getDataType(ele);
  switch (type) {
    case "[object String]":
    case "[object NodeList]":
    case "[object Array]":
      for (let i = 0; i < e.length; i++) {
        if (computedStyle(e[i], "display") === "none") e[i].style.display = "block"
      }
      break;
    default:
      if (/\[object HTML.*Element\]/.test(type)) {
        if (computedStyle(ele, "display") === "none") ele.style.display = "block"
      } else {
        throw new Error(`${fxLanguage.dom.notElement}`)
      }

  }
  return ele;
}

/**
 * 隐藏当前元素
 * @param {Element|NodeList | Array<Element>} ele 需要隐藏的元素
 * @return {Element|NodeList | Array<Element>} 返回当前元素
 */
export function hide(ele: any) {
  let e = ele;
  let type = getDataType(ele);

  switch (type) {
    case "[object String]":
    case "[object NodeList]":
    case "[object Array]":
      for (let i = 0; i < e.length; i++) {
        if (computedStyle(e[i], "display") !== "none") e[i].style.display = "none"
      }
      break;
    default:
      if (/\[object HTML.*Element\]/.test(type)) {
        if (computedStyle(ele, "display") !== "none") ele.style.display = "none"
      } else {
        throw new Error(`${fxLanguage.dom.notElement}`)
      }

  }
  return ele;
}

/**
 * 显示/隐藏元素
 * @param {Element} ele 需要隐藏的元素
 * @return {Element} 返回当前元素
 */
export function toggle(ele: any) {
  if (!isEl(ele)) throw new Error(`${fxLanguage.dom.notElement}`)
  ele.style.display = computedStyle(ele, "display") !== "none" ? "none" : "block";
}
/**
 * 当前元素的同辈元素
 * @param {string | Element} ele 当前元素
 * @param {Function} callback 每个元素的回调方法
 * @return {Array<Element>} 返回对象数组
 * @example
 *    fx.siblings("sss" | document.querySelector("div") | document.querySelectorAll("div"))  
 */
export function siblings(ele: string | Element, callback?: Function): Array<Element> {
  let e: any = ele;
  let r = [];
  let type = getDataType(ele);
  switch (type) {
    case "[object String]":
      e = document.querySelector(<string>ele);
      break;
    case "[object NodeList]":
      e = (<any>ele)[0];
      break;
    default:
      if (/\[object HTML.*Element\]/.test(type)) {
        e = ele;
      } else {
        throw new Error(`${fxLanguage.dom.notElement}`)
      }

  }

  var n = e.parentNode.firstChild;
  for (; n; n = n.nextSibling) {
    if (n.nodeType === 1 && n !== e) {
      callback && callback(n);
      r.push(n);
    }
  }

  return r;
}

/**
 * 删除元素的类
 * @param {Element} ele 元素
 * @param {string} className 类名
 * @return {Element}
 */
export function removeClass(ele: Element, className: string): Element {
  let type = getDataType(ele);
  if (!/\[object HTML.*Element\]/.test(type)) {
    throw new Error(`${fxLanguage.dom.notElement}`)
  }

  let classAry = ele.className.split(" ");
  if (classAry.indexOf(className) >= 0) classAry.splice(classAry.indexOf(className), 1);
  ele.className = classAry.join(" ");
  return ele;
}

/**
 * 添加元素的类
 * @param {Element} ele 元素
 * @param {string} className 类名
 * @return {Element}
 */
export function addClass(ele: Element, className: string): Element {
  let type = getDataType(ele);
  if (!/\[object HTML.*Element\]/.test(type)) {
    throw new Error(`${fxLanguage.dom.notElement}`)
  }

  let classAry = ele.className.split(" ");
  if (classAry.indexOf(className) === -1) classAry.push(className);
  ele.className = classAry.join(" ");
  return ele;
}

/**
 * 向当前元素的之后插入一个元素节点
 * @param {Node} newEl 插入的节点
 * @param {Node} targetEl 当前的节点
 * @return {Node} 返回插入的节点
 */
export function insertAfter(newEl: any, targetEl: any) {
  var parentEl = targetEl.parentNode;

  if (parentEl.lastChild == targetEl) {
    parentEl.appendChild(newEl);
  } else {
    parentEl.insertBefore(newEl, targetEl.nextSibling);
  }

  // targetEl.insertAdjacentElement("afterEnd", newEl);

  return newEl;
}

/**
 * 向当前元素的之前插入一个元素节点
 * @param {Node} newEl 插入的节点
 * @param {Node} targetEl 当前的节点
 * @return {Node} 返回插入的节点
 */
export function insertBefore(newEl: any, targetEl: any) {
  // let parentEl = targetEl.parentNode;

  targetEl.insertAdjacentElement("beforeBegin", newEl);

  //parentEl.insertBefore(newEl, targetEl);

  return newEl;
}

/**
 * 返回指定的父级元素
 * @param {Element} ele 当前元素
 * @param {string} tag 返回元素的名
 * @return {Element | null} 返回指定的元素，没有则返回null
 */
export function parent(ele: Element, tag: string) {
  if (!tag || tag.length <= 0) return null;
  let d = ele.parentElement;

  do {
    if (eleEqualStr(d, tag)) {
      return d;
    }
    if (d.nodeName === "HTML") return null;
    d = d.parentElement;
  } while (d)

  return null;
}

/**
 * 返回指定的父级元素集合
 * @param {Element} ele 当前元素
 * @param {string} tag 返回元素的名
 * @return {Element<Element|undefined>} 返回指定的元素集合，没有则返回[]
 */
export function parents(ele: Element, tag: string) {
  let d = ele.parentElement, eleAry: Array<any> = [];
  if (!tag || tag.length <= 0) return eleAry;

  do {
    if (eleEqualStr(d, tag)) {
      eleAry.push(d);
    }
    if (d.nodeName === "HTML") return eleAry;
    d = d.parentElement;
  } while (d)

  return eleAry;
}



/**
 * 获取元素的偏移量 相对计算 相对于上一个定位元素的计算
 * @param {Node} Node 当前元素节点 
 * @param {Element} ele 终止的节点
 * @return {object} {top:top,left:left}
      * @param {number} top 元素节点离顶部的距离
      * @param {number} left 元素节点离左部的距离
 */
export function getOffset(Node: any, ele?: any) {
  let offset = { top: 0, left: 0 };
  offsets(Node, offset);
  function offsets(Node: any, offset: any): any {
    if ((ele && Node === ele) || Node == document.body || !Node) {
      //当该节点为body节点时，结束递归        
      return offset;
    }
    offset.top += Node.offsetTop;
    offset.left += Node.offsetLeft;
    return offsets(Node.offsetParent, offset);//向上累加offset里的值
  }
  return offset;
}


/**
 * 获取元素偏移的滚动条距离 相对计算 相对于上一个定位元素的计算
 * @param {Element} ele 当前元素
 * @return {object} {top:top,left:left}
      * @param {number} top 元素节点离顶部的滚动条距离
      * @param {number} left 元素节点离左部的滚动条距离
 */
export function getOffsetScroll(ele: any) {
  let scroll = { left: 0, top: 0 }
  let offsetParent = ele.offsetParent;
  while (ele !== offsetParent) {
    scroll.top += ele.scrollTop;
    scroll.left += ele.scrollLeft;
    ele = ele.parentElement;
  }
  return scroll;
}

/**
 * 获取元素偏移的滚动条距离 相对计算 相对于html的滚动条的距离
 * @param {Element} ele 当前元素
 * @return {object} {top:top,left:left}
      * @param {number} top 元素节点离顶部的滚动条距离
      * @param {number} left 元素节点离左部的滚动条距离
 */
export function AllScroll(ele: any) {
  let scroll = { left: 0, top: 0 }
  while (ele) {
    scroll.top += ele.scrollTop;
    scroll.left += ele.scrollLeft;
    ele = ele.parentElement;
  }
  return scroll;
}

/**
 * 获取元素偏移的滚动条距离 绝对计算 相对于body的计算
 * @param {Element} ele 当前元素
 * @return {object} {top:top,left:left}
      * @param {number} top 元素节点离顶部的滚动条距离
      * @param {number} left 元素节点离左部的滚动条距离
 */
export function getoffsetAndScroll(ele: any) {
  var scroll = { left: 0, top: 0 };

  while (ele) {
    if (ele !== document.body) {
      scroll.top += ele.offsetTop - ele.scrollTop;
      scroll.left += ele.offsetLeft - ele.scrollLeft;
    }
    ele = ele.offsetParent;
  }
  // scroll.top += document.querySelector("html").scrollTop + document.querySelector("body").scrollTop;
  // scroll.left += document.querySelector("html").scrollLeft + document.querySelector("body").scrollLeft;

  return scroll
}

/**
* 数组元素交换位置
* @param {array} arr 数组
* @param {number} index1 添加项目的位置
* @param {number} index2 删除项目的位置
* @return {array} 返回交换后的数组
* index1和index2分别是两个数组的索引值，即是两个要交换元素位置的索引值，如1，5就是数组中下标为1和5的两个元素交换位置
*/
export function swapArray(arr: Array<any>, index1: number, index2: number) {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0];
  return arr;
}

/**
 * 删除元素 兼容IE
 * @param {Element} ele 需要删除的元素
 */
export function remove(ele: any) {

  if (ele.removeNode) {
    ele.removeNode(true);
  } else {
    ele.remove();
  }
}


/**
 * 返回指定的子级元素集合
 * @param {Element} ele 当前元素
 * @param {string} tag 返回元素的名
 * @return {Element<Element|undefined>} 返回指定的元素集合，没有则返回[]
 */
export function find(ele: any, tag: string) {
  let d = ele, eleAry:Array<any> = [];

  function recursion(ele: any, tag: string) {
    let childrenAll = ele.children;
    if (childrenAll.length > 0) {
      for (let i = 0; i < childrenAll.length; i++) {
        if (eleEqualStr(childrenAll[i], tag)) {
          eleAry.push(childrenAll[i]);
        }
        recursion(childrenAll[i], tag);
      }
    }
  }

  recursion(ele, tag);

  return eleAry;
}