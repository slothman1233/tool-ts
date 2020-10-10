import { textContent } from "./textContent";
import { appendContent } from "./appendContent";
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