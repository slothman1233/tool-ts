/**
 * 兼容table的innerHTML
 * @param {HTMLElement} table 需要赋值表格元素
 * @param {String} html 添加的内容
 * @return {HTMLElement} 返回table
 * @example setTableInnerHTML(document.createElement('table'),html) => table
 */
export function setTableInnerHTML(table: any, html: string) {
    if (navigator && navigator.userAgent.match(/msie/i)) {
      var temp = table.ownerDocument.createElement('div');
      temp.innerHTML = '<table><tbody>' + html + '</tbody></table>';
      if (table.tBodies.length == 0) {
        var tbody = document.createElement("tbody");
        table.appendChild(tbody);
      }
      table.replaceChild(temp.firstChild.firstChild, table.tBodies[0]);
    } else {
      table.innerHTML = html;
    }
    return table
  }