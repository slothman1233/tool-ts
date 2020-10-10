/**
 * 递归替换
 * @param { Array<any> } args 所有的参数   后面的参数替换前面的参数
 * @return { object }
 * @example
 *  extend({a:1,b:2},{a:2,c:3}) =>  {a:2,b:2,c:3}
 */
export function extend(...args: Array<any>) {
    if (args.length < 1) {
      return {}
    } else if (args.length == 1) {
      return RecursionSubstitution({}, args[0])
    } else {
      var argObj = args[0];
      for (var ii = 1; ii < args.length; ii++) {
        argObj = RecursionSubstitution(argObj, args[ii]);
      }
      return argObj;
    }
  
    function RecursionSubstitution(c: any, f: any) {
      if (!c) c = {};
      for (var i in f) {
        if (f[i] && typeof f[i] == "object") {
          c[i] = RecursionSubstitution(c[i], f[i]);
        } else {
          c[i] = f[i];
        }
      }
      return c;
    }
  }