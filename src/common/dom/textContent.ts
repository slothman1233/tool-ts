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