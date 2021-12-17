/**
 * 异步加载js文件
 * @param {Array<string>} fileAry js文件的数组
 */
export function addScriptLoad(fileAry: Array<string>) {
    recursion(fileAry, 0);
  
    function recursion(fileAry: Array<string>, i: number) {
      if (fileAry.length > 0) {
        ScriptModel(fileAry[i]).onload = function () {
          if (fileAry.length - 1 != i) {
            recursion.call(this, fileAry, ++i);
          }
        }
  
      }
      function ScriptModel(src: string) {
        var js = document.createElement('script');
        js.src = src;
        document.getElementsByTagName('head')[0].appendChild(js);
        return js;
      }
      return false;
    }
  }