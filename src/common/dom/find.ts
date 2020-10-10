import { eleEqualStr } from './../event/eleEqualStr';
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