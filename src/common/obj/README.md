
## obj.js 

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












