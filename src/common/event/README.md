
## event.js 

 *方法三引入路径：import { 方法名 } from "@stl/tool-ts/src/common/event/方法名"*

  `1. on(data) 绑定方法`  
      * @param {listenDataModel} data    
      * @param {String | Element} agent 代理对象  
      * @param {Stirng} events 触发的方法  
      * @param {Stirng} ele 事件对象  
      * @param {Function} fn 事件方法  
      * @return {Element} 事件对象  
      * @example  
      *      on({  
      *          agent:document.body 或者 "body",  
      *          events:"click",  
      *          ele:".aa",  
      *          fn:function(){console.log(1)}  
      *      })  

  `2. off(data) 解除绑定`   
      * @param {listenDataModel} data   
      * @param {String | Element} agent 代理对象  
      * @param {Stirng} events 触发的方法  
      * @param {Stirng} ele 事件对象  
      * @param {Function} fn 事件方法  
      * @return {Element} 事件对象  
      * @example  
      *      off({  
      *          agent:document.body 或者 "body",  
      *          events:"click",  
      *          ele:".aa",  
      *          fn:function(){console.log(1)}  
      *      })  
  
  `3. dom(str) 获取指定的所有对象 相当于document.qrerySelectorAll`  
      * @param {String} str 元素的字符串名称  
      * @return {Array<Element>} 返回对象的数组  

  `4. once(dom, event, callback) 只触发一次的方法`  
      * @param {Element} dom  元素  
      * @param {String} event  方法名称  
      * @param {Function} callback 执行的方法  

  `5. eleEqualStr(ele, str) 元素是否是str所指的元素`  
      * @param {Element} ele 比对的元素   
      * @param {String} str  元素的字符串  #id   .class  aa[data-id=aa] [data-id]  

  `6. eventsPath(e) 兼容 e.path方法`    
      *@param {Event} e 需要获取的指针  
  
  `7. getTagName(str) 解析出属性名称和值`  
      * @param {string} str [data-id=11]  [data-id] [data-id='a']  
      * @return {Array<String>} [0]属性名称 [1]属性值 值不存在为null  









