
import { isPlain, each } from './obj';
import { addSyntheticLeadingComment } from 'typescript';



//lib.d.ts 并未提供IE8的 attachEvent和 detachEvent 方法
export interface IE8HTMLInputElement extends HTMLInputElement {
  attachEvent(event: string, listener: EventListener): boolean;
  detachEvent(event: string, listener: EventListener): boolean;
}


/**
 * 绑定方法
 * @param {Element} obj 绑定的元素
 * @param {String} type 方法名称
 * @param {function} fn  绑定的方法
 */
export const addEvent = (obj: any, type: string, fn: any) => {

  if (obj.addEventListener) {
    obj.addEventListener(type, fn, false);
  } else {
    obj['e' + type + fn] = fn;
    obj[type + fn] = function () { obj['e' + type + fn](window.event); }
    obj.attachEvent('on' + type, obj[type + fn]);
  }

}

/**
 * 解除方法绑定
 * @param {Element} obj 解除方法绑定的元素
 * @param {String} type 方法名称
 * @param {function} fn  解除方法绑定的方法
 */
export const removeEvent = (obj: any, type: string, fn?: any) => {
  if (obj.detachEvent) {
    obj.detachEvent('on' + type, obj[type + fn]);
    obj[type + fn] = null;
  } else
    obj.removeEventListener(type, fn, false);
}

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

/**
 * 合并对象
 * @param { Array<any> } args 所有的参数   后面的参数替换前面的参数
 * @param sources 需要合并的对象
 */
export function mergeOptions(...sources: Array<any>) {
  const result: any = {};

  sources.forEach(source => {
    if (!source) {
      return;
    }

    each((<any>source), (value: any, key: any) => {
      if (!isPlain(value)) {
        result[key] = value;
        return;
      }

      if (!isPlain(result[key])) {
        result[key] = {};
      }

      result[key] = mergeOptions(result[key], value);
    });
  });

  return result;
}

/**
 * 递归替换
 * @param { Array<any> } args 所有的参数   后面的参数替换前面的参数
 * @return { object }
 * @example
 *  extend({a:1,b:2},{a:2,c:3}) =>  {a:2,b:2,c:3}
 */
export function extend(...args: Array<any>) {
  if (args.length < 1) {
    return {}
  } else if (args.length == 1) {
    return RecursionSubstitution({}, args[0])
  } else {
    var argObj = args[0];
    for (var ii = 1; ii < args.length; ii++) {
      argObj = RecursionSubstitution(argObj, args[ii]);
    }
    return argObj;
  }

  function RecursionSubstitution(c: any, f: any) {
    if (!c) c = {};
    for (var i in f) {
      if (f[i] && typeof f[i] == "object") {
        c[i] = RecursionSubstitution(c[i], f[i]);
      } else {
        c[i] = f[i];
      }
    }
    return c;
  }
}

/**
 * 异步加载js文件
 * @param {Array<string>} fileAry js文件的数组
 */
export function addScriptLoad(fileAry: Array<string>) {
  recursion(fileAry, 0);

  function recursion(fileAry: Array<string>, i: number) {
    if (fileAry.length > 0) {
      ScriptModel(fileAry[i]).onload = function () {
        if (fileAry.length - 1 != i) {
          recursion.call(this, fileAry, ++i);
        }
      }

    }
    function ScriptModel(src: string) {
      var js = document.createElement('script');
      js.src = src;
      document.getElementsByTagName('head')[0].appendChild(js);
      return js;
    }
    return false;
  }
}

/**
 * 请求回传的状态
 * @param {string} subCode 状态码
 * @return {boolean} true 成功 false 失败
 */
export function dataState(subCode: string) {
  let state = subCode.slice(-2);
  if (state === "00") return true;
  return false;
}

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

/**
 * 获取元素的下标
 * @param {Element} Ele 当前元素
 * @return {number} 元素的下标
 */
export function index(Ele: HTMLElement): number {
  if (Ele.nodeName === "HTML" || Ele.nodeName === "BODY") return 0;

  let parent = Ele.parentElement;
  let chidren = parent.children;
  for (let i = 0; i < parent.childElementCount; i++) {
    if (chidren[i] === Ele) return i;
  }

  return 0;
}

/**
 * 去掉字符串的前后空格
 * @param {string} value 字符串
 * @return {string} 去掉前后空格的字符串
 */
export function trim(value: string): string {
  if (Object.prototype.toString.call(value) !== "[object String]") return value;
  return value.replace(/^\s*|\s*$/, "");
}

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

