//lib.d.ts 并未提供IE8的 attachEvent和 detachEvent 方法
export interface IE8HTMLInputElement extends HTMLInputElement {
    attachEvent(event: string, listener: EventListener): boolean;
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