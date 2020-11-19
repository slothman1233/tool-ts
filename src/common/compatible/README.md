
## compatible.js 

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
  | toFormData | 转FormData数据 | data 需要转换的数据 | 转换后的数据 | toFormData(data) |
  | dataState | 请求回传的状态 | subCode (string) 状态码 | true 成功 false 失败 | dataState(subCode) |
  | strlen | 把中英文的长度都转成字符串行的长度 中文：2个字符 英文：1个字符  | str (string) | (number) 长度 | strlen(str) |
  | index | 获取元素的下标  | Ele (Element) 当前元素 | 元素的下标 (number) | index(Ele) |
  | trim | 去掉字符串的前后空格  | value (string) 字符串 | 去掉前后空格的字符串 (string) | trim(value) |
  | toFixeds | 四舍五入保留几位小数点 toFixeds的兼容处理  | value (string|number) 需要取余的数字;N (number|string) 保留小数点后几位数 | 处理后的值 为null则val不是数字 (string|null) | toFixeds(value,N) |
  | getChildElementNodes | IE下的children兼容处理  | element (Element) 要获取子元素的元素 | 子元素列表 (Array<Element>) | getChildElementNodes(element) |







