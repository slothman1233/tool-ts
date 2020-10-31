ts工具库
====

使用方法
-----

```
1:引入index.ts文件 此方法会将index.ts中引入的所有ts文件都打包到页面的js文件中
import { compatible } from "@stl/tool-ts/src"  
compatible.getCookie("userKey")

2：引入单个ts文件  此方法只会将引入的对应的ts文件打包到页面的js文件中
import { getCookie,setCookie } from "@stl/tool-ts/src/common/compatible"
getCookie("userKey")
setCookie("userKey")

3：引入单个方法 此方法只会将对应的方法打包到页面的js文件中  （推荐）
import { getCookie } from "@stl/tool-ts/src/common/compatible/getCookie"
getCookie("userKey")
```

目录
-----

1. [Browser](#browserjs)

    browser.ts:获取浏览器信息的一些变量   

2. [Compatible](#compatiblejs)

    compatible.ts:一些通用的方法（具体方法描述请转至下面方法详细说明）    

3. [ComputedStyle](#computedstylejs)

    computed-style.ts:获取元素样式表里面的样式    

4. [Dom](#domjs)

    dom.ts:操作dom元素的方法集合    

5. [Event](#eventjs)

    event.ts:dom元素事件绑定的相关方法  

6. [Obj](#objjs)

    obj.ts:数据类型判断及转换的相关方法    

7. [number](#numberjs)

    number.ts:格式化数字的相关方法

8. [Es6](#es6js)

    es6.ts:数组迭代方法的实现

9. [Fetch](#fetchjs)

    fetch.ts:用于访问和操纵HTTP管道的一些具体部分，例如请求和响应。

10. [Log](#logjs)

    log.ts:console.log和alert的封装。

11. [Priomse](#priomsejs)

    priomse.ts:简易promise实现

12. [RequestNextAnimationFrame](#requestNextAnimationFramejs)

    requestNextAnimationFrame.ts:requestAnimationFrame实现

13. [Subscrible](#subscriblejs)

    subscrible.ts:动态安装 发布-订阅功能

14. [Window](#windowjs)

    window.ts:返回window对象
  
## browser.js 
<div id="browser"></div>

  *方法三引入路径：import { 方法名 } from "@stl/tool-ts/src/common/browser/方法名"*

  |  变量名 |        描述       |   用法示例              |
  | :----------:  | :------------:   | :-------:           |
  |   IS_PC       |   是否是PC端      |  console.log(IS_PC)  |
  |   IS_IPAD    |   是否是ipad      |  console.log(IS_IPAD)  |
  |   IS_IPHONE    |   是否是iphone      |  console.log(IS_IPHONE)  |
  |   IS_IPOD    |   是否是iPod      |  console.log(IS_IPOD)  |
  |   IS_IOS   | 是否是ios |console.log(IS_IOS)  |
  |   IOS_VERSION   |  ios的版本号 没有则返回null      |  console.log(IOS_VERSION)  |
  |   IS_ANDROID   |   是否是android      |  console.log(IS_ANDROID)  |
  |   ANDROID_VERSION  |   android的版本号 没有则返回null      |  console.log(ANDROID_VERSION)  |
  |   IS_NATIVE_ANDROID  |   是否是本机android浏览器      |  console.log(IS_NATIVE_ANDROID)  |
  |   IS_FIREFOX  |   是否是火狐浏览器      |  console.log(IS_FIREFOX)  |
  |   IE_VERSION  |   IE的版本号 没有则返回-1 edge浏览器返回'edge'  |  console.log(IE_VERSION)  |
  |   IS_EDGE  |  是否是Edge  |  console.log(IS_EDGE)  |
  |   IS_CHROME  |   是否是Chrome  |  console.log(IS_CHROME)  |
  |   CHROME_VERSION  |   Chrome的版本号 没有则返回null  |  console.log(CHROME_VERSION)  |
  |   IS_IOS_SAFARI  |   是否是ios下的Safari  |  console.log(IS_IOS_SAFARI)  |
  |   IS_SAFARI  |  是否是Safari  |  console.log(IS_SAFARI)  |

## compatible.js 
<div id="compatible"></div>

  *方法三引入路径：import { 方法名 } from "@stl/tool-ts/src/common/compatible/方法名"*

  |  方法 |        描述       |   参数名 (类型) 参数描述     |  返回值(类型)   |  用法示例   |
  | :----------:  |  :------------:  | :-------:  | :-------:  | :-------:  |
  | addEvent | 绑定方法 | obj (element) 绑定的元素； type (string) 方法名称；fn (function) 绑定的方法 | 无 | addEvent(obj,type,fn)  |
  | removeEvent | 解除方法绑定 | obj (element) 解除方法绑定的元素 type (string) 方法名称；fn (function) 解除方法绑定的方法 | 无 | removeEvent(obj,type,fn)  |
  | getCookie | 获取cookie里面的值 | name (string) cookie名称 | 对应cookie名称的值  不存在返回null (string)| getCookie(name) |
  | setCookie | 写入cookie | name (string) cookie名称；value (string) cookie值；time (string) 存储时间 首字符代表时间名词（s20表示20秒 h表示小时 d表示天） | 无 | setCookie(name,value,"d3") |
  | GetQueryString | 获取链接的参数 | name (string) 要获取的参数名 | 对应参数名的值  不存在返回null (string)| GetQueryString(name) |
  | GethashString | 获取链接hash后面的参数 | name (string) hash名称 | 对应的hash名称的值 (string)| GethashString(name) |
  | mergeOptions | 合并对象 | args (Array<Any>) 所有的参数   如有重名后面的参数替换前面的参数;sources 需要合并的对象 | 合并后的对象 | mergeOptions(obj1,obj2...,obj) |
  | extend | 递归替换 | args (Array<Any>) 所有的参数   后面的参数替换前面的参数(extend({a:1,b:2},{a:2,c:3}) =>  {a:2,b:2,c:3}) | 替换后的对象 | extend(obj1,obj2...,obj) |
  | addScriptLoad | 异步加载js文件 | fileAry (Array<String>) js文件的数组 | 无 | addScriptLoad(fileAry) |
  | addLinkLoad | 异步加载css文件 | fileAry (Array<String>) js文件的数组 | 无 | addLinkLoad(fileAry) |
  | dataState | 请求回传的状态 | subCode (string) 状态码 | true 成功 false 失败 | dataState(subCode) |
  | strlen | 把中英文的长度都转成字符串行的长度 中文：2个字符 英文：1个字符  | str (string) | (number) 长度 | strlen(str) |
  | index | 获取元素的下标  | Ele (Element) 当前元素 | 元素的下标 (number) | index(Ele) |
  | trim | 去掉字符串的前后空格  | value (string) 字符串 | 去掉前后空格的字符串 (string) | trim(value) |
  | toFixeds | 四舍五入保留几位小数点 toFixeds的兼容处理  | value (string|number) 需要取余的数字;N (number|string) 保留小数点后几位数 | 处理后的值 为null则val不是数字 (string|null) | toFixeds(value,N) |
  | getChildElementNodes | IE下的children兼容处理  | element (Element) 要获取子元素的元素 | 子元素列表 (Array<Element>) | getChildElementNodes(element) |

## computedStyle.js 
<div id="computedstyle"></div>

  *此ts文件中只有一个方法 使用第二种方法调用也只会将此方法打包到页面js中，不能使用第三种方法调用*

  |  方法 |        描述       |   参数名 (类型) 参数描述     |  返回值(类型)   |  用法示例   |
  | :----------:  |  :------------:  | :-------:  | :-------:  | :-------:  |
  | computedStyle | 获取元素样式表里面的样式 | el (Element) 获取样式的元素；prop (string) 样式的名称 | 需要获取的样式值 (String或Number) | computedStyle(el,prop) |

## dom.js 
<div id="dom"></div>

   *方法三引入路径：import { 方法名 } from "@stl/tool-ts/src/common/dom/方法名"*

  `1. isTextNode(value) 判断是否是文本`  
      *@param {any} value 内容

  `2. createEl(tagName, ...arg)`  
      * 传一个元素  
      * @param {String} tagName 标签  
      * @param properties 标签里面的文本内容  
              {className: 'vjs-seek-to-live-text',innerHTML: this.localize('LIVE')}  
      * @param {Object} attributes  添加属性  
      * @param {Array<Element> | Element} content 标签里面添加元素  
      * @return {Element} 返回添加的元素  
      *   
      * @or  
      * 只传入一个参数   
      * @param {String} tagName html代码  
      * @return {Element} 返回需要创建的html代码的元素  
      * @example  
```
              createEl("<div>adsffadf</div>")  
```

  `3. textContent(el, text) 添加文本内容的兼容处理`  
      * @param {Element} el 需要添加文本的元素   
      * @param {String} text 添加的文本   
      * @return {Element} 元素  

  `4. appendContent(el, content) 添加元素`  
      * @param {Element} el 父元素  
      * @param {Array<Element> | Element} content 添加的元素   
      * @return {Element} 父元素  

  `5. normalizeContent(content)`  
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

  `6. hasClass(element, classToCheck) 检索元素的类中是否包含该类`  
      * @param {Element} element  查找的元素  
      * @param {String} classToCheck 需要匹配的类  
      * @return {boolean} true包含  false包含  

  `7. setTableInnerHTML(table, html) 兼容table的innerHTML`  
      * @param {HTMLElement} table 需要赋值表格元素  
      * @param {String} html 添加的内容  
      * @return {HTMLElement} 返回table  
      * @example setTableInnerHTML(document.createElement('table'),html) => table  

  `8. show(ele) 显示当前元素`  
      * @param {Element|NodeList | Array<Element>} ele 需要显示的元素    
      * @return {Element|NodeList | Array<Element>} 返回当前元素     

  `9. hide(ele) 隐藏当前元素`  
      * @param {Element|NodeList | Array<Element>} ele 需要隐藏的元素  
      * @return {Element|NodeList | Array<Element>} 返回当前元素  

  `10. toggle(ele) 显示/隐藏元素`  
       * @param {Element} ele 需要隐藏的元素  
       * @return {Element} 返回当前元素  

  `11. siblings(ele, callback?) 当前元素的同辈元素`  
        * @param {string | Element} ele 当前元素  
        * @param {Function} callback 每个元素的回调方法  
        * @return {Array<Element>} 返回对象数组  
        * @example  
        *    siblings(".sss" | document.querySelector("div") | document.querySelectorAll("div"))    

  `12. removeClass(ele, className) 删除元素的类`  
        * @param {Element} ele 元素  
        * @param {string} className 类名  
        * @return {Element}  

  `13. addClass(ele, className) 添加元素的类`  
        * @param {Element} ele 元素  
        * @param {string} className 类名  
        * @return {Element}  

  `14. insertAfter(newEl, targetEl) 向当前元素的之后插入一个元素节点`  
        * @param {Node} newEl 插入的节点  
        * @param {Node} targetEl 当前的节点  
        * @return {Node} 返回插入的节点  

  `15. insertBefore(newEl, targetEl) 向当前元素的之前插入一个元素节点`  
        * @param {Node} newEl 插入的节点  
        * @param {Node} targetEl 当前的节点  
        * @return {Node} 返回插入的节点  
 
  `16. parent(ele, tag) 返回指定的父级元素`  
        * @param {Element} ele 当前元素  
        * @param {string} tag 返回元素的名   #id   .class  aa[data-id=aa] [data-id]
        * @return {Element | null} 返回指定的元素，没有则返回null  

  `17. parents(ele, tag) 返回指定的父级元素集合`  
        * @param {Element} ele 当前元素  
        * @param {string} tag 返回元素的名  #id   .class  aa[data-id=aa] [data-id] 
        * @return {Element<Element|undefined>} 返回指定的元素集合，没有则返回[]  

  `18. getOffset(Node, ele?) 获取元素的偏移量 相对计算 相对于上一个定位元素的计算`  
        * @param {Node} Node 当前元素节点   
        * @param {Element} ele 终止的节点  
        * @return {object} {top:top,left:left}  
            * @param {number} top 元素节点离顶部的距离  
            * @param {number} left 元素节点离左部的距离  

  `19. getOffsetScroll(ele) 获取元素偏移的滚动条距离 相对计算 相对于上一个定位元素的计算`  
        * @param {Element} ele 当前元素  
        * @return {object} {top:top,left:left}  
            * @param {number} top 元素节点离顶部的滚动条距离  
            * @param {number} left 元素节点离左部的滚动条距离  

  `20. AllScroll(ele) 获取元素偏移的滚动条距离 相对计算 相对于html的滚动条的距离`  
        * @param {Element} ele 当前元素  
        * @return {object} {top:top,left:left}  
            * @param {number} top 元素节点离顶部的滚动条距离  
            * @param {number} left 元素节点离左部的滚动条距离  

  `21. getoffsetAndScroll(ele)  获取元素偏移的滚动条距离 绝对计算 相对于body的计算`  
        * @param {Element} ele 当前元素  
        * @return {object} {top:top,left:left}  
            * @param {number} top 元素节点离顶部的滚动条距离  
            * @param {number} left 元素节点离左部的滚动条距离  

  `22. swapArray(arr, index1, index2) 数组元素交换位置`  
        * @param {array} arr 数组  
        * @param {number} index1 添加项目的位置  
        * @param {number} index2 删除项目的位置  
        * @return {array} 返回交换后的数组  
        * index1和index2分别是两个数组的索引值，即是两个要交换元素位置的索引值，如1，5就是数组中下标为1和5的两个元素交换位置  

  `23. remove(ele) 删除元素 兼容IE`  
        * @param {Element} ele 需要删除的元素  

  `24. find(ele, tag) 返回指定的子级元素集合`  
        * @param {Element} ele 当前元素  
        * @param {string} tag 返回元素的名  
        * @return {Element<Element|undefined>} 返回指定的元素集合，没有则返回[]  

  `25. throwIfWhitespace(str) 类具有非法空格字符`  
        * @param {string} str 字符串  
        * @return {boolean}   

  `26. classRegExp(className) 正则表达式化`  
        * @param {string} className 正则的匹配内容  
        * @return {RegExp} 正则表达式对象  

  `27.isEl(value)是否是元素`
        * @param {any} value 元素

## event.js 
<div id="event"></div>

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

## obj.js 
<div id="obj"></div>

   *方法三引入路径：import { 方法名 } from "@stl/tool-ts/src/common/obj/方法名"*

  `1. isObject(value) 是否是object类型`  
      *param value 需要判断的值  
      *return {boolean}  
  
  `2. isPlain(value) 判断是否是数组对象类型`  
      *param value 需要判断的值  
      *return {boolean}  

  `3. isString(value) 判断是否是字符串`  
      *param value 需要判断的值  
      *return {boolean}  
  
  `4. each(object, fn) 对象的循环`  
      * @param {Object} object 对象  
      * @param {Function} fn(value,key) 回调的函数  

  `5. getDataType(any) 获取或判断任意数据类类型的通用方法`  
      * @param {any} any 任意数据  
      * @example  
      * var aa=null;  
      * getDataType(aa);[object Null]  
      * var abc;  
      * getDataType(abc); //[object Undefined] 说明此变量已经声明，但尚未被初始化  
      * var fn=function(){}  
      * getDataType(fn); //[object Function]  
      * getDataType(new Object()); //[object Object]  
      * getDataType("Hello");//[object String]  
      * getDataType(234);//[object Number]  
      * getDataType(true));//[object Boolean]  
      * getDataType(new Date()); //[object Date]  
      * getDataType(new Date().getTime()); //[object Number]  
      * getDataType(document.getElementById("demopic")); //[object HTMLDivElement]  
      * getDataType(document.querySelector('div'));//[object HTMLDivElement]  
      * var nodelist=NodeListToArray(document.getElementsByTagName("*"));  
      * getDataType(nodelist); //[object Array]  
      * getDataType(document.getElementsByTagName("*")); //[object NodeList)]  
      * getDataType(document.querySelectorAll('div')); //[object NodeList)]  
      * //nodelist[10].tagName);  
      * getDataType(/[a-z]/); //[object RegExp]  

  `6. NodeListToArray(nodes) NodeList转为数组`  
      * @param {NodeList} nodes 对象数组类型  
      * @return {Array} 转化后的数组  
      * var nodeList = document.querySelectorAll(".box")  
      * NodeListToArray(nodeList)  

  `6. pySegSort(arr,arr1) 中文按照拼音排序，并且可以将中文按照a,b,c,d……进行区分`  
      * @param {NodeList} arr 数组类型  
      * @param {NodeList} arr1 数组类型 
      * @return {Array} 转化后的数组  
      * let arr = ['白鸽', '麻雀','黑','大象', '狗', '猫','妈妈','马', "鸡",'瘦','胖']
      * pySegSort(arr)  
      *返回结果  [{letter:"b",data:["白鸽"]},{letter:"d",data:["大象"]}...]
      * let arr = ['白鸽', '麻雀','黑','大象', '狗', '猫','妈妈', "鸡",'瘦','胖','马']
      * let arr1 = [1, 2,3,4,5,6,7,8,9,10,11]
      * pySegSort(arr,arr1)  
      *返回结果  [{letter:"b",data:["白鸽"],id:[1]}...{letter:"m",data:["马","妈妈","麻雀","猫",],id:[11,7,2,6]}...]

## number.js 
<div id="number"></div>

  *方法三引入路径：import { 方法名 } from "@stl/tool-ts/src/common/number/方法名"*

  `1. cutNumber(num) 数字每三位加逗号`  
      * @param {number} num 需要格式化的数字  
      * @return {string} 格式化后的数字   
      * cutNumber(123456) "123,456"  

  `2. tranNumber(num,point,unit,tofixe) 数字添加单位（"万","亿"）`  
      * @param {number} num 需要格式化的数字  
      * @param {Number} point 需要保留的小数位数 没有则传0  
      * @param {Array} unit 需要添加的单位列表 如["万","亿"] 可传单位："百","千","万","十万","百万","千万","亿"  
      * @param {Boolean} tofixe 是否需要四舍五入  默认为true，传false时则向下保留小数  
      * @return {string} 格式化后的数字  
      * tranNumber(123456789.54,2,["万","亿"])   

  `3. makeupDecimal(num,point,fixeType) 保留n位小数，补零处理`  
      * @param {number} num 需要格式化的数字  
      * @param {number} point 需要保留的小数位数 没有则传0  
      * @param {string} fixeType 可选值 fixe：四舍五入保留小数,floor：向下保留小数,ceil:向上保留小数 默认为fixe;  
      * @return {string} 格式化后的数字  
      * makeupDecimal(1.999,2,"floor") "1.99"  
      * makeupDecimal(1.999,2) "2.00"  

   `4. unmakeupDecimal(num,point,fixeType) 保留n位小数，不补零处理`  
      * @param {number} num 需要格式化的数字  
      * @param {number} point 需要保留的小数位数 没有则传0  
      * @param {string} fixeType 可选值 fixe：四舍五入保留小数，floor：向下保留小数，ceil:向上保留小数  默认为fixe;  
      * @return {string} 格式化后的数字   
      * unmakeupDecimal(1.999,2,"floor") "1.99"   
      * unmakeupDecimal(1.999,2) "2"  

  
## es6.js 
<div id="es6"></div>

   *所有方法详解见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)*

   `1.Array.prototype.find  找到第一个满足测试函数的元素并返回那个元素的值，如果找不到，则返回 undefined`

   `2.Array.prototype.indexOf  返回数组中第一个与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1。`

   `3.Array.prototype.forEach  为数组中的每个元素执行一次回调函数。`

   `4.Array.prototype.map  返回一个由回调函数的返回值组成的新数组。`

   `5.Array.prototype.filter  将所有在过滤函数中返回 true 的数组元素放进一个新数组中并返回。`

   `6.Array.prototype.some  如果数组中至少有一个元素满足测试函数，则返回 true，否则返回 false。`

   `7.Array.prototype.every  如果数组中的每个元素都满足测试函数，则返回 true，否则返回 false。`

   `8.Array.prototype.findIndex  找到第一个满足测试函数的元素并返回那个元素的索引，如果找不到，则返回 -1。`

   `9.Array.prototype.copyWithin  在数组内部，将一段元素序列拷贝到另一段元素序列上，覆盖原有的值。`

   `10.Array.prototype.includes  判断当前数组是否包含某指定的值，如果是返回 true，否则返回 false。`

   `11.Array.prototype.reduce  从左到右为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。`
```
使用方法：
    import "@stl/tool-ts/src/common/es6";
    const array1:any = [5, 12, 8, 130, 44];
    const found = array1.find(element => element > 10);
    console.log(found);
```
  
## fetch.js 
<div id="fetch"></div>

   *引入路径：import { get,post } from "@stl/tool-ts/src/common/fetch"*
   *方法详解见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)*

  `1. get(url,params) get请求` 
        * @param {string} url 请求地址  
        * @param {object} params 请求参数  

   `2. post(url,params) post请求` 
        * @param {string} url 请求地址  
        * @param {object} paramsObj 请求参数  
  
## log.js 
<div id="log"></div>

   *引入路径：import { 方法名 } from "@stl/tool-ts/src/common/log/方法名"*

  `1. log(value) console.log` 
        * @param {any} value 要打印的值  

   `2. post(value) alert` 
        * @param {any} value 要打印的值  
  
## promise.js 
<div id="promise"></div>
 
   *引入路径：import { promise } from "@stl/tool-ts/src/common/promise"*
   *使用方法详见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)*
  
## requestNextAnimationFrame.js 
<div id="requestNextAnimationFrame"></div>

   *引入路径：import { requestNextAnimationFrame } from "@stl/tool-ts/src/common/requestNextAnimationFrame"*
   *使用方法详见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)*
  

## subscrible.js 
<div id="subscrible"></div>

```
使用方法:
    import { installEvents } from "@stl/tool-ts/src/common/subscrible";
    let event = installEvents();       //没有代理对象的缓存
```

## window.js 
<div id="window"></div>

```
使用方法:
    import window from '@stl/tool-ts/src/common/window';
```