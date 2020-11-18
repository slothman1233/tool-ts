
## number.js 

  *方法三引入路径：import { 方法名 } from "@stl/tool-ts/src/common/number/方法名"*

  `1. cutNumber(num) 数字每三位加逗号`  
      * @param {number} num 需要格式化的数字  
      * @return {string} 格式化后的数字   
      * cutNumber(123456) "123,456"  

  `2. tranNumber(num,point,unit,tofixe) 数字添加单位（"万","亿"）`  
      * @param {number} num 需要格式化的数字  
      * @param {Number} point 需要保留的小数位数 没有则传0  
      * @param {Array} unit 需要添加的单位列表 如["万","亿"] 可传单位："百","千","万","十万","百万","千万","亿"  
      * @param {Boolean} tofixe 是否需要四舍五入  默认为true，传false时则向下保留小数  
      * @return {string} 格式化后的数字  
      * tranNumber(123456789.54,2,["万","亿"])   

  `3. makeupDecimal(num,point,fixeType) 保留n位小数，补零处理`  
      * @param {number} num 需要格式化的数字  
      * @param {number} point 需要保留的小数位数 没有则传0  
      * @param {string} fixeType 可选值 fixe：四舍五入保留小数,floor：向下保留小数,ceil:向上保留小数 默认为fixe;  
      * @return {string} 格式化后的数字  
      * makeupDecimal(1.999,2,"floor") "1.99"  
      * makeupDecimal(1.999,2) "2.00"  

   `4. unmakeupDecimal(num,point,fixeType) 保留n位小数，不补零处理`  
      * @param {number} num 需要格式化的数字  
      * @param {number} point 需要保留的小数位数 没有则传0  
      * @param {string} fixeType 可选值 fixe：四舍五入保留小数，floor：向下保留小数，ceil:向上保留小数  默认为fixe;  
      * @return {string} 格式化后的数字   
      * unmakeupDecimal(1.999,2,"floor") "1.99"   
      * unmakeupDecimal(1.999,2) "2"  








