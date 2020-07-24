/**
 * 图片轮播
 * @param {object} json {parent:parent ,delayTime: 3000}
        * @param {Element} parent 父级的元素
        * @param {number} delayTime 自动播放每次时间间隔
 */
interface slideModel {
    parent: string;
    delayTime: number;
}
/**
 * 图片轮播
 * @param {object} json {parent:parent ,delayTime: 3000}
        * @param {string} parent 父级的元素的名称字符串 例如 "#parent .slide"
        * @param {number} delayTime 自动播放每次时间间隔
 */
export declare function slidePic(json: slideModel): typeof slidePic;
export {};
