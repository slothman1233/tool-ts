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