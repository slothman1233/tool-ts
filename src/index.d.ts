
///<reference path="./indexModel.d.ts" />

//lib.d.ts 并未提供IE8的 attachEvent和 detachEvent 方法
declare var fx: {
  /**
   * 绑定方法
   * @param {Element} obj 绑定的元素
   * @param {String} type 方法名称
   * @param {function} fn  绑定的方法
   */
  addEvent(obj: any, type: string, fn: any): void

  /**
   * 解除方法绑定
   * @param {Element} obj 解除方法绑定的元素
   * @param {String} type 方法名称
   * @param {function} fn  解除方法绑定的方法
   */
  removeEvent(obj: IE8HTMLInputElement, type: string, fn: any): void

  /**
   * 是否是ipad
   *
   * @type {Boolean}
   */
  IS_IPAD: boolean

  /**
   * 是否是iPhone
   *
   * @type {Boolean}
   */
  IS_IPHONE: boolean

  /**
   * 是否是iPod
   *
   * @type {Boolean}
   */

  IS_IPOD: boolean

  /**
   * 是否是ios
   *
   * @type {Boolean}
   */

  IS_IOS: boolean

  /**
   * 是否是android
   *
   * @type {Boolean}
   */

  IS_ANDROID: boolean

  /**
   * 是否是火狐浏览器
   *
   * @return {Boolean}
   */
  IS_FIREFOX: boolean

  /**
   * 是否是Edge
   *
   * @return {Boolean}
   */
  IS_EDGE: boolean

  /**
   * 是否是Chrome
   *
   * @return {Boolean}
   */
  IS_CHROME: boolean
  /**
   * 是否是PC
   * @return {Boolean}
   */
  IS_PC: boolean
  /**
   * 是否是ios下的Safari
   *
   * @return {Boolean}
   */
  IS_IOS_SAFARI: boolean

  /**
   * 是否是Safari
   *
   * @return {Boolean}
   */
  IS_SAFARI: boolean
  /**
   * ios的版本号 没有则返回null
   *
   * @return {string|null}
   */
  IOS_VERSION: string | null

  /**
   * android的版本号 没有则返回null
   *
   * @return {number|string|null}
   */
  ANDROID_VERSION: number | string | null

  /**
   * 这是否是本机Android浏览器
   *
   * @return {Boolean}
   */
  IS_NATIVE_ANDROID: boolean

  /**
   * Chrome的版本号 没有则返回null
   *
   * @return {number|string|null}
   */
  CHROME_VERSION: number | string | null

  /**
   * IE的版本号 没有则返回-1
   *
   * @return {Number|String|null}
  -1 不是ie浏览器 Number
  6/7/8/9/10/11 浏览器的版本 Number
  'edge'  ie的edge浏览器 String
  */
  IE_VERSION: number | string | null

  /**
   * 获取元素样式表里面的样式
   * @param {Element} el 获取样式的元素
   * @param {string} prop 样式的名称
   * @return {String | Number}
   */
  computedStyle(el, prop: string): string | number

  /**
   * 是否是元素
   * @param {String} value 元素
   * @return {boolean}
   */
  isEl(value: string): boolean

  /**
   * 判断是否是文本
   * @param {String} value 内容
   * @return {boolean}
   */
  isTextNode(value: string): boolean

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

  createEl(tagName: string, properties?: object, attributes?: object, content?: Array<Element> | Element): Element

  /**
   * 添加文本内容的兼容处理
   * @param {Element} el 需要添加文本的元素 
   * @param {String} text 添加的文本 
   * @return {Element} 元素
   */
  textContent(el: Element, text: string): Element

  /**
   * 添加元素
   * @param {Element} el 父元素
   * @param {Array<Element> | Element} content 添加的元素 
   * @return {Element} 父元素
   */
  appendContent(el: Element, content: Array<Element> | Element): Element

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
  normalizeContent(content: any): Array<Node>

  /**
   * 是否是object类型
   * @return {boolean}
   */
  isObject(value: any): boolean

  /**
   * 判断是否是数组对象类型
   * @param value 值
   */
  isPlain(value: any): boolean

  /**
   * 判断是否是字符串
   * @param value 值
   */
  isString(value: any): boolean

  /**
   * 对象的循环
   * @param object 需要解析循环的对象
   * @param fn(value,key) 执行的方法
          @param value 当前对象的值
          @param key 当前对象的下标
   */
  each(object: object, fn: any)

  /**
   * xhr请求
   * GET
   * DELETE
   * POST {hreaders:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
   * POSTBODY {headers:{'Content-Type': 'application/json; charset=UTF-8'}}
   */
  http: xhr

  /**
   * 动态安装 发布-订阅功能
   * @return events
          @param clientList 订阅缓存
          @param listen(订阅名称,订阅的函数)
          @param arg(函数的参数)
   */
  installEvents(): events

  /**
   * 输出
   * @param value 输出的内容
   */
  log(value: any)

  /**
   * 弹窗
   * @param value 弹窗的内容
   */
  popup(value: any)
  /**
   * 获取链接的参数
   * @param {String} name 参数名
   * @return {String} 参数名的值  不存在返回null
   */
  GetQueryString(name: string)
  /**
   * 获取cookie里面的值
   * @param {String} name cookie名称
   * @param {String} 对应cookie名称的值  不存在返回null
   */
  getCookie(name)
  /**
   * 写入cookie
   * @param {String} name  cookie名
   * @param {String} value cookie值
   * @param {String} time  存储时间 收一个字符是代表的时间名词
                          s20是代表20秒
                          h是指小时，如12小时则是：h12
                          d是天数，30天则：d30
   */
  setCookie(name, value, time)
  /**
   * 获取链接hash后面的参数
   * @param {String} name hash名称
   * @param {String} 对应的hash名称的值
   */
  GethashString(name)
  /**
   *  requestAnimationFrame 方法
   * @param {function} callback 需要在下一帧执行的方法
   */
  requestNextAnimationFrame(callback: any)

  /**
 * 兼容table的innerHTML
 * @param {HTMLElement} table 需要赋值表格元素
 * @param {String} html 添加的内容
 * @return {HTMLElement} 返回table
 * @example setTableInnerHTML(document.createElement('table'),html) => table
 */
  setTableInnerHTML(table, html)

  /**
    * 检索元素的类中是否包含该类
    * @param {Element} element  查找的元素
    * @param {String} classToCheck 需要匹配的类
    * @return {boolean} true包含  false包含
    */
  hasClass(element, classToCheck)

  /**
   * 正则表达式化
   * @param {string} className 正则的匹配内容
   * @return {RegExp} 正则表达式对象
   */
  classRegExp(className)

  /**
   * 类具有非法空格字符
   * @param {string} str 字符串
   * @return {boolean}  
   */
  throwIfWhitespace(str)

  /**
   * 递归替换
   * @param { arguments } args 所有的参数   后面的参数替换前面的参数
   * @return { object }
   * @example
   *  extend({a:1,b:2},{a:2,c:3}) =>  {a:2,b:2,c:3}
   */
  extend(...arg)

  /**
   * 向当前元素的之后插入一个元素节点
   * @param {Node} newEl 插入的节点
   * @param {Node} targetEl 当前的节点
   * @return {Node} 返回插入的节点
   */
  insertAfter(newEl, targetEl)

  /**
  * 向当前元素的之前插入一个元素节点
  * @param {Node} newEl 插入的节点
  * @param {Node} targetEl 当前的节点
  * @return {Node} 返回插入的节点
  */
  insertBefore(newEl, targetEl)

  /**
 * 获取元素的偏移量 相对计算 相对于上一个定位元素的计算
 * @param {Node} Node 当前元素节点 
 * @return {object} {top:top,left:left}
      * @param {number} top 元素节点离顶部的距离
      * @param {number} left 元素节点离左部的距离
 */
  getOffset(Node)
  /**
   * 获取元素偏移的滚动条距离 相对计算 相对于上一个定位元素的计算
   * @param {Element} ele 当前元素
   * @return {object} {top:top,left:left}
        * @param {number} top 元素节点离顶部的滚动条距离
        * @param {number} left 元素节点离左部的滚动条距离
   */
  getOffsetScroll(ele)
  /**
 * 获取元素偏移的滚动条距离 绝对计算 相对于body的计算
 * @param {Element} ele 当前元素
 * @return {object} {top:top,left:left}
      * @param {number} top 元素节点离顶部的滚动条距离
      * @param {number} left 元素节点离左部的滚动条距离
 */
  getoffsetAndScroll(ele)
  /**
* 数组元素交换位置
* @param {array} arr 数组
* @param {number} index1 添加项目的位置
* @param {number} index2 删除项目的位置
* @return {array} 返回交换后的数组
* index1和index2分别是两个数组的索引值，即是两个要交换元素位置的索引值，如1，5就是数组中下标为1和5的两个元素交换位置
*/
  swapArray(arr, index1, index2)
  /**
   * 删除元素 兼容IE
   * @param {Element} ele 需要删除的元素
   */
  remove(ele)
  /**
  * 兼容 e.path方法
  * @param {Event} e 需要获取的指针 
  */
  eventsPath(e)
  /**
  * 显示当前元素
  * @param {Element|NodeList| Array<Element>} ele 需要显示的元素
  * @return {Element|NodeList| Array<Element>} 返回当前元素
  */
  show(el)

  /**
   * 显示当前元素
   * @param {Element|NodeList| Array<Element>} ele 需要显示的元素
   * @return {Element|NodeList| Array<Element>} 返回当前元素
   */
  hide(el)

  /**
 * 显示/隐藏元素
 * @param {Element|NodeList} ele 需要隐藏的元素
 * @return {Element|NodeList} 返回当前元素
 */
  toggle(ele)
  /**
   * 请求回传的状态
   * @param {string} subCode 状态码
   * @return {boolean} true 成功 false 失败
   */
  dataState(subCode: string)
  /**
   * 绑定方法
   * @param {listenDataModel} data 
     * @param {String | Element} agent 代理对象
     * @param {Stirng} events 触发的方法
     * @param {Stirng} ele 事件对象
     * @param {Function} fn(e) 事件方法
        *@param {Element} e 当前点击的元素 
   * @return {Element} 事件对象
   * @example
   *      fx.off({
     *          agent:document,
     *          events:"click",
     *          ele:".aa",
     *          fn:function(e){fx.log(1)}
     *          })
     */
  on(data: listenDataModel)

  /**
   * 解除绑定
   * @param {listenDataModel} data 
     * @param {String | Element} agent 代理对象
     * @param {Stirng} events 触发的方法
     * @param {Stirng} ele 事件对象
     * @param {Function} fn 事件方法
   * @return {Element} 事件对象
   * @example
   *      fx.off({
     *          agent:document,
     *          events:"click",
     *          ele:".aa",
     *          fn:function(){fx.log(1)}
     *          })
     */
  off(data: listenDataModel)
  /**
    * 获取指定的所有对象
    * @param {String} str 元素的字符串名称
    * @return {Array<Element>} 返回对象的数组
    */
  dom(str: any): Array<Element>
  /**
   * 元素是否是str所值的元素
   * @param {Element} ele 比对的元素
   * @param {String} str  元素的字符串  #id   .class  aa[data-id=aa]
   */
  eleEqualStr(ele, str)
  /**
   * 对象的循环
   * @param {Object} object 对象
   * @param {Function} fn(value,key) 回调的函数
   */
  each(object, fn)
  /**
   * 自制滚动条方法
   * @param {String} ele 需要添加滚动条的dom的id
   * @param {Number} w 滚动条的宽度
   * @param {String} scrollBar 滚动条添加的class "divScrollBar"自带滚动条的样式
   * @param {Boolean} fatherScroll  默认为false（不会滚动父级的滚动条 当前窗口滚动条到底部后，继续滚动滑轮是否继续滚动条父级的滚动条
   * @param {Function} callback 初始化完成后触发
   * @reutrn 
   * @example 
   *  var scroll = new fx.jsScroll('menu_list', 10, 'divScrollBar',true)
   *  scroll.onsize() //重置滚动条的高度
   *      
   */
  jsScroll(ele, w, scrollBar, fatherScroll, callback?): void
  /**
   * 获取或判断任意数据类类型的通用方法
   * @param {any} any 任意数据
   * @example
   * var aa=null;
   * getDataType(aa);
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
   */
  getDataType(any: any)
  /**
   * NodeList转为数组
   * @param {NodeList} nodes 对象数组类型
   * @return {Array} 转化后的数组
   */
  NodeListToArray(nodes)

  /**
   * 合并对象
   * @param arg 需要合并的对象参数
   */
  mergeOptions(...arg)
  /**
   * 当前元素的同辈元素
   * @param {string | Element} ele 当前元素
   * @param {Function} callback 每个元素的回调方法
   * @return {Array<Element>} 返回对象数组
   * @example
   *    fx.siblings("sss" | document.querySelector("div") | document.querySelectorAll("div"))  
   */
  siblings(ele: Element, callback?): Array<Element>
  /**
   * 删除元素的类
   * @param {Element} ele 元素
   * @param {string} className 类名
   * @return {Element}
   */
  removeClass(ele: Element, className: string): Element
  /**
   * 添加元素的类
   * @param {Element} ele 元素
   * @param {string} className 类名
   * @return {Element}
   */
  addClass(ele: Element, className: string): Element
  /**
   * 只执行一次的放
   * @param {Element} dom  元素
   * @param {String} event  方法名称
   * @param {Function} callback 执行的方法
   */
  once(dom, event, callback)
  /**
   * 异步加载js文件
   * @param {Array<String>} fileAry js文件的数组
   */
  addScriptLoad(fileAry);
  /**
   * 返回指定的父级元素
   * @param {Element} ele 当前元素
   * @param {string} tag 返回元素的名
   * @return {Element | null} 返回指定的元素，没有则返回null
   */
  parent(ele: Element, tag: string)

  /**
   * 返回指定的父级元素集合
   * @param {Element} ele 当前元素
   * @param {string} tag 返回元素的名
   * @return {Element<Element|undefined>} 返回指定的元素集合，没有则返回[]
   */
  parents(ele: Element, tag: string)
  /**
   * 返回指定的子级元素集合
   * @param {Element} ele 当前元素
   * @param {string} tag 返回元素的名
   * @return {Element<Element|undefined>} 返回指定的元素集合，没有则返回[]
   */
  find(ele: Element, tag: string)

  /**
  * 上传图片视频或者音频
  * fx.updateFile(data)
  * @param {ajaxfileupdateModel} data 上传需要的数据
  * data:{
  * @param {string} url:用于文件上传的服务器端请求地址
  * @param {string} type:请求类型 "get、post"
  * @param {number} filesize 文件的大小限制 默认 1024 * 1024 * 50
  *  @param {Array<string>} FileTypeArray 允许传的文件类型  优先于data.FileType
  * @param {object} data:
        * {
        * @param {string} FileElementId:input的id,
        * @param {number} FileType 上传的类型  1 图片   2音频   3视频
        * @param {string} Uid 用户id
        * }
  * @param {string} dataType:返回的类型
  * @param {Function} beforeSend 请求执行前的回调
  * @param {Function} success(data) 成功后的回调
         *  @param {object} 服务器回传的数据
  * @param {Function} error(s,type,e)  失败后的回调
        * @param  {object } s 上传的参数 
        * @param { object } type 错误类型
        * @param { any } e 程序错误的说明 
  * @param {Function} complete  请求完成不管成功还是失败都会执行
  * }
  * @example
   document.getElementById('upload-file').onchange = function () {
            fx.updateFile({
                url: "/UploadFile/Post", //用于文件上传的服务器端请求地址
                type: "post",
                data: { FileElementId: "upload-file", FileType: 1, Uid: 123 }, //此参数非常严谨，写错一个引号都不行
                secureuri: false, //一般设置为false
                fileElementId: "upload-file", //文件上传空间的id属性  <input type="file" id="file" name="file" />
                dataType: "dataType", //返回值类型 一般设置为json
                success: function (d) {
                    console.log(d);
                },
                error: function (data, status, e) {
                }
            })
        }
  */
  updateFile(data: ajaxfileupdateModel)
  /**
   * 自定义下拉列表继承了自制滚动条
   * 样式引入 https://gajsapi.fx110.com/script/FX/style/select.css
   * @param {Element} dom 父盒子
   * @param {object} datas fx.SelectMethod(document.getElementById("Mechanism"), { height: 150, id: 1, scroll: { w: 10, c: '' }, callback: function () { }, optionCallback: function (text, id) { console.log(text + '_' + id); }, bodyMassage:[{"Id": "0", "Name": "许可机构" },{"Id": "0", "Name": "许可机构" }]});
              * @param {object} bodyMassage 列表数据
                      * @param {string | number} id：唯一标示（展示默认为0）
                      * @param {string} name 名称
              * @param {number} height 下拉列表的最大高度
              * @param {string | number} d 为-100的情况下默认内容的提示
              * @param {string} Selected 下拉列表选中子集的样式 默认:selected
              * @param {string} prompt 提示语（当d = -100的情况下默认内容的提示语）
              * @param {Function} callback 加载完成后的回调方法
              * @param {Function} optionCallback(text,id) 点击选择子菜单的选项后触发,text:内容,id：当前选项的id
              * @param {object} scroll 滚动条的属性
                      * @param {number} w 滚动条的宽度 默认10
                      * @param {string} c 滚动条的样式 默认divScrollBar
                      * @param {boolean} fatherScroll 是否需要滚动父级的滚动条 默认为false
                      *                               当前窗口滚动条到底部后，继续滚动滑轮是否继续滚动条父级的滚动条
   */
  SelectMethod(dom, datas)
  /**
   * 拖拽的控件
    * @param {object} data { dragParent: document.querySelector("#id") | "string",  dragEnd: function () { }, placeHolderTemplate: "<div class='Imgms'></div>" }
           * @param {Element | string} dragParent 父级的元素获取元素的id class。
           * @param {string} dragLevel 触发拖动的部分 1为containe本身 2级为 head部分  3级为 content部分   -1为使用dragEle为拖拽的元素
           * @param {string} dragEle  当dragLevel为-1时的拖拽元素的 id class
           * @param {function} dragEnd(thatdragEle,thatReplaceEle,thatPosition) 拖动结束后将被调用的回调函数
                          thatdragEle // 当前拖拽的元素
                          thatReplaceEle //替换的元素
                          thatPosition = [-1, -1] //位置 [0]1是父级 2是子级   [1]1上面 2是下面
           * @param {string} placeHolderTemplate 拖动列表的填充部分。
           * @param {string | number} Maxlevel 允许最大拖动的层级
           * @param {object} bodyMessage [{headEle:headEle,contentEle:contentEle,id:id,children:[{headEle:headEle,contentEle:contentEle,children[]}]}]
                * @param {string} id 标识
                * @param {Element} headEle 标题部分内容的元素
                * @param {Element} contentEle 主体部分内容的元素
                * @param {Array<object>} children 当前条目的子级 [{headEle:headEle,contentEle:contentEle,id:id,children:[{headEle:headEle,contentEle:contentEle,children[]}]}]
      * example 
      `  var headEle = document.createElement("div");
        headEle.innerHTML = "头部1";
        var contentEle = document.createElement("div");
        contentEle.innerHTML = "内容";
    
        fx.dragsort({
          dargParent: "#dd1",
          dragLevel: "0",
          dragEle:"-1",
          dragEnd: function () { console.log(3) },
          bodyMessage: [
            {
              id: 1,
              headEle: headEle.cloneNode(true),
              contentEle: contentEle.cloneNode(true),
              children: [
                {
                  id: 2,
                  headEle: headEle.cloneNode(true),
                  contentEle: contentEle.cloneNode(true),
                  children: [
                    {
                      id: 3,
                      headEle: headEle.cloneNode(true),
                      contentEle: contentEle.cloneNode(true),
                      children: []
                    }
                  ]
                }
              ]
            },
            {
              id: 4,
              headEle: headEle.cloneNode(true),
              contentEle: contentEle.cloneNode(true),
              children: [
                {
                  id: 5,
                  headEle: headEle.cloneNode(true),
                  contentEle: contentEle.cloneNode(true),
                  children: [
                    {
                      id: 6,
                      headEle: headEle.cloneNode(true),
                      contentEle: contentEle.cloneNode(true),
                      children: []
                    }
                  ]
                }
              ]
            }
          ],
          Maxlevel: "3",
          placeHolderTemplate: "<li style='background:red;height:41px;'>3456345645643563</li>"
        })
        `
      */
  dragsort(data)
  /**
   * 单行拖拽的控件
   * @param {object} data { dragSelector: "#solo > .Imgms" ,  dragEnd: function () { }, placeHolderTemplate: "<div class='Imgms'></div>" }
          * @param {string} dragMove CSS选择器内的元素的列表项的移动手柄。
          * @param {string} dragSelector 拖动手柄必须要是dragMove子级的元素，如果是自身就不用传
          * @param {function} dragEnd 拖动结束后将被调用的回调函数
          * @param {string} placeHolderTemplate 拖动列表的HTML部分。
  */
  lineDragSort(data)
  /**
  * 图片轮播
  * @param {object} json {parent:parent ,delayTime: 3000}
         * @param {string} parent 父级的元素的名称字符串 例如 "#parent .slide"
         * @param {number} delayTime 自动播放每次时间间隔
  */
  slidePic(json)
  /**
 * 把中英文的长度都转成字符串行的长度    中文：2个字符    英文：1个字符 
 * @param {string} str 
 */
  strlen(str)
  /**
   * 兼容promise
   */
  promise: Promises
  /**
 * 获取元素的下标
 * @param {Element} Ele 当前元素
 * @return {number} 元素的下标
 */
  index(Ele: HTMLElement): number
  /**
 * IE下的children兼容处理
 * @param {Element} element 
 * @return {Array<Element>}
 */
  getChildElementNodes(element)
  /**
 * 去掉字符串的前后空格
 * @param {string} value 字符串
 * @return {string} 去掉前后空格的字符串
 */
  trim(value: string): string
  /**
  * 图片放大 带单图和多图的
  *    <img src="" title="描述" data-viewer="大图">
  * 
  * @param {object} options {parentEle:parentEle,prevBgImg:prevBgImg,nextBgImg:nextBgImg,closeBgImg:closeBgImg,IsBox:IsBox,isPaging:isPaging}
         * @param {Element|string|Array<Element>|Array<string>} parentEle 图片集合的父元素或者元素字符串
         * @param {string} prevBgImg 上一张按钮图片 默认有图片
         * @param {string} nextBgImg 下一张按钮图片 默认有图片
         * @param {string} closeBgImg 关闭按钮图片 默认有图片
         * @param {boolean} IsBox 是否需要显示背景 默认true
         * @param {boolean} isPaging 是否需要翻页 默认true
  * example
  *  <div id="solo1">
       <div class="Imgms">
           <img src="http://upload.fx110.com/files/thumbnail/201702/529CFE3C42BC3F613FCCE51B8D0F4B94.png" title="dfasdfad1sf" data-viewer="https://cdn-flash.jin10.com/b230ba5d-48a2-4d9f-bd96-98cf85737104.png">
       </div>
       <div class="Imgms">
           <img src="http://upload.fx110.com/files/thumbnail/201702/529CFE3C42BC3F613FCCE51B8D0F4B94.png" title="dfasdfa2dsf" data-viewer="http://upload.fx110.com/files/thumbnail/201702/529CFE3C42BC3F613FCCE51B8D0F4B94.png">
       </div>
       <div class="Imgms">
           <img src="http://upload.fx110.com/files/thumbnail/201702/529CFE3C42BC3F613FCCE51B8D0F4B94.png" title="dfasdfa3dsf" data-viewer="http://upload.fx110.com/files/thumbnail/201702/529CFE3C42BC3F613FCCE51B8D0F4B94.png">
       </div>
       <p>asdfsdfasdfsdfsdf</p>
   </div>
 
   fx.imgMagnification({parentEle:document.getElementById("solo1")})
  */
  imgMagnification(options)

  /**
  * 右键多级菜单
  * @param { Element | NodeList | Array<Element> | string} ele 右键元素
  * @param {Function} callback 右键后的回调
  * @param {contextmenuData} data [{contentDom:contentDom,children:[]}]
        * @param {Element} contentDom 内容的元素
        * @param {contextmenuData} children 子元素
        * @param {Function} callback(ele) 点击的回调 
                * @param {Element} ele 当前右键的元素
  */

  contextmenu(data: contextmenuData)

  /**
   * 分页控件 需要引用默认样式： 样式1： https://gajsapi.fx110.com/script/public/kkpager/kkpager_blue.min.css  或者  https://gajsapi.fx110.com/script/public/kkpager/kkpager.min.css
   * @param {kkpagerNewsModel} fx.kkpager({data:data})
          * @param {string | number} pagerid 分页容器id
          * @param {string | number} total 总页数
          * @param {string |number} pno: 当前页码
          * @param {boolean} isShowTotalPage 是否显示总页数
          * @param {boolean} isGoPage 是否显示页码跳转输入框
          * @param {string} mode 分页类型：link（链接类型），click（点击类型）
          * @param {string} hrefFormer 链接前部（mode:link有效）
          * @param {string} hrefLatter 链接尾部（mode:link有效）
          * @param {Function} getLink 链接算法（mode:link有效） function (n) {}   n 当前的页码
          * @param {Function} click 点击执行（mode:click有效） function (n, config) {} //n  当前页面   config:{total: 10, pagerid: "kkpager"} 总页数 当前容器id
    * example
    * 
    `  fx.kkpager({
              pagerid: "kkpager",
              total: 10,
              pno: 4,
              isShowTotalPage: false,
              isShowCurrPage: false,
              isGoPage: false,
              mode: 'click',
              click: function (n, config) {}
          },
              true);
   
          fx.kkpager({
              pagerid: "kkpager1",
              total: 10,
              pno: 4,
              isShowTotalPage:true,
              isShowCurrPage: true,
              isGoPage: true,
              mode: 'link',
              hrefFormer: '链接前部',
              hrefLatter: '链接尾部',
              getLink: function (n) {
                  if (n == 1) {
                      return this.hrefFormer + this.hrefLatter;
                  }
                  return this.hrefFormer + '_' + n + this.hrefLatter;
              }
          },
              true);
   */
  kkpager(data: kkpagerNewsModel)
  /**
  * 四舍五入保留几位小数点 toFixeds的兼容处理
  * @param {string | number} val  需要取余的数字
  * @param  {string | number} N  保留小数点后几位数
  * @return {string|null}  为null则val不是数字
  */
  toFixeds(val: string | number, N: string | number): string | null


  /**
   * md5加密
   * @param {string} s 加密的内容
   */
  md5(s: string)
  /**
  * md5加密
  * @param {string} s 加密的内容
  */
  hex_md5(s: string)
  /**
  * md5加密
  * @param {string} s 加密的内容
  */
  b64_md5(s: string)
  /**
  * md5加密
  * @param {string} s 加密的内容
  */
  str_md5(s: string)
  /**
  * md5加密
  * @param {string} s 加密的内容
  */
  hex_hmac_md5(s: string)
  /**
  * md5加密
  * @param {string} s 加密的内容
  */
  b64_hmac_md5(s: string)
  /**
  * md5加密
  * @param {string} s 加密的内容
  */
  str_hmac_md5(s: string)



  /**
  * 图片拖动 缩放的效果
  * new fx.proportion(data)
  * @param {object} data
      * @param {Element} parentEle  容器元素
      * @param {Array<number>} thumbnailSize 缩略图片的尺寸 已宽为准
      * @param {number} allWidth 上传头像框的总宽     默认500
      * @param {number} allHeight 上传头像框的总高     默认500
      * @param {number} ImageWidth  原图片的宽
      * @param {number} ImageHeight 原图片的高
      * @param {number} InterceptWidth  截取的宽            默认400
      * @param {number} InterceptHeight 截取的高            默认400
      * @param {number} VirtualEdge  半透明的大小        默认50
      * @param {boolean} BrokerRadius 是否需要圆角的蒙版  默认false
      * @param {boolean} Isthumbnail 是否需要缩略图      默认true
      * @param {string} imageUrl 图片地址
      * @param {Element} narrowDom 点击执行缩小的元素
      * @param {Element} enlargeDom 点击执行放大的元素
      * @param {string} Wheel  点击放大缩小每次的大小  默认10px
      * 
  * example
  * 
  `
  var a = new fx.proportion({
            thumbnailSize:[100],
            InterceptWidth:300,
            InterceptHeight:400,
            imageUrl: "https://gafxchatimage.fx110.com/api/secrecymaster/html_up/2019/3/20190319192952353.png",
            parentEle: document.querySelector(".hread"),
            narrowDom: document.querySelector(".s"),
            enlargeDom: document.querySelector(".b"),
            mousemoveCallback:function(data){
                console.log(1,e)
            },
            zoomCallback:function(data){  
                console.log(2,e)
            }
                            data{
                              originWidth:原始图片的宽度
                              originHeight:原始图片的高度
                              width:缩放后的宽度
                              height:缩放后的高度
                              x:x轴坐标 正数
                              y:y轴坐标  正数
                              src:图片路径
                            }
        })
  
  a.updataImage(data:proportionModel) 更新图片
  
  `
  */
  proportion: {
    new(data: proportionModel)
  }


}