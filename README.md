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
    
    [详细说明](https://gitwbp5.wbp5.com/npm/tool-ts/tree/dev/src/common/browser/README.md)
    ```
    包含变量：
    IS_PC:是否是PC端，  
    IS_IPAD:是否是ipad，  
    IS_IPHONE:是否是iphone，   
    IS_IPOD:是否是iPod，  
    IS_IOS:是否是ios，  
    IOS_VERSION:ios的版本号，  
    IS_ANDROID是否是android，  
    ANDROID_VERSION:android的版本号，  
    IS_NATIVE_ANDROID:是否是本机android浏览器，    
    IS_FIREFOX:是否是火狐浏览器，  
    IE_VERSION:IE的版本号，  
    IS_EDGE:是否是Edge，  
    IS_CHROME:是否是Chrome，  
    CHROME_VERSION:Chrome的版本号，  
    IS_IOS_SAFARI:是否是ios下的Safari，  
    IS_SAFARI:是否是Safari  
    ```   

2. [Compatible](#compatiblejs)

    [详细说明](https://gitwbp5.wbp5.com/npm/tool-ts/tree/dev/src/common/compatible/README.md)
    ```
    包含方法：
    addEvent:绑定方法,  
    removeEvent:解除方法绑定,  
    getCookie:获取cookie里面的值,  
    setCookie:写入cookie,  
    GetQueryString:获取链接的参数,  
    GethashString:获取链接hash后面的参数,  
    mergeOptions:合并对象,  
    extend:递归替换,  
    addScriptLoad:异步加载js文件,  
    addLinkLoad:异步加载css文件,  
    toFormData:转FormData数据,  
    dataState:请求回传的状态,  
    strlen:把中英文的长度都转成字符串行的长度,  
    index:获取元素的下标,  
    trim:去掉字符串的前后空格,  
    toFixeds：四舍五入保留几位小数点,  
    getChildElementNodes:IE下的children兼容处理  
    ```   

3. [ComputedStyle](#computedstylejs)

    ```
      *获取元素样式表里面的样式,此ts文件中只有一个方法 使用第二种方法调用也只会将此方法打包到页面js中，不能使用第三种方法调用*

        |  方法 |        描述       |   参数名 (类型) 参数描述     |  返回值(类型)   |  用法示例   |
        | :----------:  |  :------------:  | :-------:  | :-------:  | :-------:  |
        | computedStyle | 获取元素样式表里面的样式 | el (Element) 获取样式的元素；prop (string) 样式的名称 | 需要获取的样式值 (String或Number) | computedStyle(el,prop) |
    ``` 

4. [Dom](#domjs)

    [详细说明](https://gitwbp5.wbp5.com/npm/tool-ts/tree/dev/src/common/dom/README.md)  
    ```
    包含方法：
    isTextNode:判断是否是文本  
    createEl:创建元素   
    textContent：添加文本内容的兼容处理  
    appendContent：添加元素  
    normalizeContent：规范化最终插入到DOM中的内容   
    hasClass：检索元素的类中是否包含该类  
    setTableInnerHTML：兼容table的innerHTML  
    show：显示当前元素  
    hide：隐藏当前元素   
    toggle：显示/隐藏元素  
    siblings：当前元素的同辈元素  
    removeClass：删除元素的类  
    addClass：添加元素的类   
    insertAfter：向当前元素的之后插入一个元素节点  
    insertBefore：向当前元素的之前插入一个元素节点  
    parent：返回指定的父级元素  
    parents：返回指定的父级元素集合  
    getOffset：获取元素的偏移量 相对计算 相对于上一个定位元素的计算  
    getOffsetScroll：获取元素偏移的滚动条距离 相对计算 相对于上一个定位元素的计算  
    AllScroll：获取元素偏移的滚动条距离 相对计算 相对于html的滚动条的距离  
    getoffsetAndScroll：获取元素偏移的滚动条距离 绝对计算 相对于body的计算  
    swapArray：数组元素交换位置  
    remove：删除元素 兼容IE  
    find：返回指定的子级元素集合  
    throwIfWhitespace：类具有非法空格字符  
    classRegExp：类名正则表达式化  
    isEl：是否是元素  
    ```  

5. [Event](#eventjs)

    [详细说明](https://gitwbp5.wbp5.com/npm/tool-ts/tree/dev/src/common/event/README.md)
    ```
    包含方法：
    on:绑定方法  
    off:解除绑定  
    dom:获取指定的所有对象 相当于document.qrerySelectorAll  
    once:只触发一次的方法  
    eleEqualStr:元素是否是str所指的元素    
    eventsPath:兼容 e.path方法  
    getTagName:解析出属性名称和值  
    ```

6. [Obj](#objjs)

    [详细说明](https://gitwbp5.wbp5.com/npm/tool-ts/tree/dev/src/common/obj/README.md)
    ```
    包含方法：
    isObject:是否是object类型  
    isPlain:判断是否是数组对象类型  
    isString:判断是否是字符串  
    each:对象的循环  
    getDataType:获取或判断任意数据类类型的通用方法   
    NodeListToArray:NodeList转为数组  
    pySegSort:中文按照拼音排序，并且可以将中文按照a,b,c,d……进行区分    
    ```

7. [object](#objectjs)

    [详细说明](https://gitwbp5.wbp5.com/npm/tool-ts/tree/dev/src/common/object/README.md)
    ```
    包含方法：
    Object.keys()兼容性处理
    ```

8. [array](#arrayjs)
    
    [详细说明](https://gitwbp5.wbp5.com/npm/tool-ts/tree/dev/src/common/array/README.md)
     ```
    包含方法：
    1.Array.prototype.find  
    2.Array.prototype.indexOf  
    3.Array.prototype.forEach  
    4.Array.prototype.map    
    5.Array.prototype.filter   
    6.Array.prototype.some    
    7.Array.prototype.every    
    8.Array.prototype.findIndex  
    9.Array.prototype.copyWithin  
    10.Array.prototype.includes  
    11.Array.prototype.reduce    
    ```

9. [number](#numberjs)

    [详细说明](https://gitwbp5.wbp5.com/npm/tool-ts/tree/dev/src/common/number/README.md)
    ```
    包含方法：
    cutNumber:数字每三位加逗号  
    tranNumber:数字添加单位（"万","亿"）  
    makeupDecimal:保留n位小数，补零处理  
    unmakeupDecimal:保留n位小数，不补零处理  
    ```

10. [Fetch](#fetchjs):用于访问和操纵HTTP管道的一些具体部分，例如请求和响应。

    *引入路径：import { get,post } from "@stl/tool-ts/src/common/fetch"*
    *方法详解见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)*

   `1. get(url,params) get请求` 
        * @param {string} url 请求地址  
        * @param {object} params 请求参数  

   `2. post(url,params) post请求` 
        * @param {string} url 请求地址  
        * @param {object} paramsObj 请求参数  

11. [Log](#logjs):console.log和alert的封装

    *引入路径：import { 方法名 } from "@stl/tool-ts/src/common/log/方法名"*

    `1. log(value) console.log` 
        * @param {any} value 要打印的值  

    `2. post(value) alert` 
        * @param {any} value 要打印的值  
  

12. [Priomse](#priomsejs):简易promise实现

    ```
    *引入路径：import { promise } from "@stl/tool-ts/src/common/promise"*
    *使用方法详见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)*
    ```

13. [RequestNextAnimationFrame](#requestNextAnimationFramejs):requestAnimationFrame实现

    ```
    *引入路径：import { requestNextAnimationFrame } from "@stl/tool-ts/src/common/requestNextAnimationFrame"*
    *使用方法详见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)*
    ```

14. [Subscrible](#subscriblejs):动态安装 发布-订阅功能

    ```
    使用方法:
        import { installEvents } from "@stl/tool-ts/src/common/subscrible";
        let event = installEvents();       //没有代理对象的缓存
    ```

15. [Window](#windowjs):返回window对象

    ```
    使用方法:
        import window from '@stl/tool-ts/src/common/window';
    ```
16. [work](#workjs)

    ```
        webwork.ts web端的work线程池控制  
        serverwork.ts server端的work线程池控制
    ```

17. [getScrollTop](#getScrollTopjs):页面/元素滚动到指定位置的方法

    ```
    使用方法:
        import window from '@stl/tool-ts/src/common/getScrollTop';
        * @param {scrollObj} obj    
            * @param {Element} dom 滚动元素 默认为document.body
            * @param {number} destination 目标位置 默认为0
            * @param {number} time 运动时长 默认1000 
            * @param {0|1} type 运动类型 0为匀速运动，1为缓冲运动 默认为1 
    ```




