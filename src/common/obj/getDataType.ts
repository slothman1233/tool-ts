
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
export function getDataType(any:any) {
    /* (1) Object.prototype.toString.call 方法判断类型：
    优点：通用，返回"[object String]" 具体object的类型
    缺点：不能返回继承的类型
    
    (2)typeof x 
    缺点：对object类型不能细分；
    优点：对空null的判断 'undefined'的应用;
    返回类型有：'undefined' “string” 'number' 'boolean' 'function' 'object'
    
    (3) instanceof 能返回具体的类型，只适用于用new关键字创建的对象进行判断
    */
    // var baseType=["string","number","boolean"];//基本类型
    // var refType=["object", "Function","Array","Date"];//引用类型
    try {
      var dtype = Object.prototype.toString.call(any);
      if (dtype == "[object Object]") //IE，某个dom元素对象
      {
  
        try {
          if (any.constructor) {
            var constructorStr = any.constructor.toString(); //obj.constructor可以返回继承的类型
            if (constructorStr.indexOf("Array") != -1) { dtype = "[object Array]"; }
            else if (constructorStr.indexOf("HTMLCollection") != -1) { /* IE */ dtype = "[object NodeList]"; }
            else if ((constructorStr.indexOf("function") != -1) && (constructorStr.indexOf("Object()") != -1)) { dtype = "[object Object]"; }
            else dtype = constructorStr;
          }
        }
        catch (e) {
          return "[object Null]";
        }
  
  
      } else {
        if (dtype == "[object HTMLCollection]") { /* FF */ dtype = "[object NodeList]"; }
      }
      return dtype;
  
  
    } catch (e) { return "variable is not defined."; }
  }
  