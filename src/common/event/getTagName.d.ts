/**
 * 解析出属性名称和值
 * @param {string} str [data-id=11]  [data-id] [data-id='a']
 * @return {Array<string>} [0]属性名称 [1]属性值 之不存在为null
 */
export declare function getTagName(str: string): string[];
