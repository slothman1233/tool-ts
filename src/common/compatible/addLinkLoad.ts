/**
 * 异步加载css文件
 * @param {Array<string>} fileAry css文件的数组
 */
export function addLinkLoad(fileAry: Array<string>) {
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
        var link = document.createElement('link');
        link.href = src;
        link.rel = "stylesheet";
        document.getElementsByTagName('head')[0].appendChild(link);
        return link;
      }
      return false;
    }
  }