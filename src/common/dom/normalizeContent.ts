import { isEl } from "./isEl";
import { isTextNode } from "./isTextNode";
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