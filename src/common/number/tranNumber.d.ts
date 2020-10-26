/**
 * 格式化数字（添加单位）
 * @param {Number} num 需要格式化的数字
 * @param {Number} point 需要保留的小数位数 没有则传0
 * @param {Array} unit 需要添加的单位列表 如["万","亿"]  可传单位："百","千","万","十万","百万","千万","亿"
 * @param {Boolean} tofixe 是否需要四舍五入  默认为true，传false时则向下保留小数
 * * @return {String}  处理好的数字
 */
export declare function tranNumber(num: number, point: number, unit: Array<string>, tofixe?: boolean): string;
