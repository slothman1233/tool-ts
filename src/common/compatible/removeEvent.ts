//lib.d.ts 并未提供IE8的 attachEvent和 detachEvent 方法
export interface IE8HTMLInputElement extends HTMLInputElement {
    detachEvent(event: string, listener: EventListener): boolean;
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