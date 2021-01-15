
## event.js 

 *方法三引入路径：import { 方法名 } from "@stl/tool-ts/src/common/h5toapp/index"*

  `1. index(type: string, config: any) 绑定方法`  
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
/* 调用方法
         * index(type,{参数名:参数值,参数名2:参数值2,...参数名n:参数值n})
         * @param {Stirng} type 方法类型名
         * @param {Object} obj  参数列表
         * @example  
         *      index("aa",{a:1,b:2})  
         */

