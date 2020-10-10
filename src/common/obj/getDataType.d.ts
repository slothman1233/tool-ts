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
export declare function getDataType(any: any): any;
