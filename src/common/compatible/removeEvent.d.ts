export interface IE8HTMLInputElement extends HTMLInputElement {
    detachEvent(event: string, listener: EventListener): boolean;
}
/**
 * 解除方法绑定
 * @param {Element} obj 解除方法绑定的元素
 * @param {String} type 方法名称
 * @param {function} fn  解除方法绑定的方法
 */
export declare const removeEvent: (obj: any, type: string, fn?: any) => void;
