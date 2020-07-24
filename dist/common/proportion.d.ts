/// <reference path="../src/languages/language.d.ts" />
/// <reference path="../src/indexModel.d.ts" />
interface proportionsModel extends proportionModel {
    allWidth?: number;
    allHeight?: number;
    ImageWidth?: number;
    ImageHeight?: number;
}
/**
 * 图片拖动 移动图片
 * new fx.proportion(data)
 * @param {object} data
     * @param {Element} parentEle  容器元素
     * @param {Array<number>} thumbnailSize 缩略图片的尺寸 已宽为准
     * @param {number} allWidth 上传头像框的总宽     默认500
     * @param {number} allHeight 上传头像框的总高     默认500
     * @param {number} ImageWidth  原图片的宽
     * @param {number} ImageHeight 原图片的高
     * @param {number} InterceptWidth  截取的宽            默认400
     * @param {number} InterceptHeight 截取的高            默认400
     * @param {number} VirtualEdge  半透明的大小        默认50
     * @param {boolean} BrokerRadius 是否需要圆角的蒙版  默认false
     * @param {boolean} Isthumbnail 是否需要缩略图      默认true
     * @param {string} imageUrl 图片地址
     * @param {Element} narrowDom 点击执行缩小的元素
     * @param {Element} enlargeDom 点击执行放大的元素
     * @param {string} Wheel  点击放大缩小每次的大小  默认10px
     *
 * example
 *
 `
  var a = new fx.proportion({
            thumbnailSize:[100],
            InterceptWidth:300,
            InterceptHeight:400,
            imageUrl: "https://gafxchatimage.fx110.com/api/secrecymaster/html_up/2019/3/20190319192952353.png",
            parentEle: document.querySelector(".hread"),
            narrowDom: document.querySelector(".s"),
            enlargeDom: document.querySelector(".b"),
            mousemoveCallback:function(e){
                console.log(1,e)
            },
            zoomCallback:function(e){
                console.log(2,e)
            }
        })
 `
 */
declare class proportions {
    proportions_guid: number;
    data: proportionsModel;
    Imgwidths: any;
    ImgHeights: any;
    Frame: any;
    ImgOWidth: any;
    ImgOHeight: any;
    isDown: any;
    MaxLeft: any;
    MaxTop: any;
    MinLeft: any;
    MinTop: any;
    oldX: any;
    oldY: any;
    narrowDomEvent: string;
    enlargeDomEvent: string;
    installEvents: any;
    constructor(data: proportionModel);
    LisntEvent(): void;
    init(data: any): void;
    html(): string;
    MouseWheel(id: any): void;
    ImgEnlarge(): void;
    ImgNarrow(): void;
    LoadImgCb(l: any, t: any): void;
    setClip(x: any, y: any): void;
    thumbailSize(): void;
    thumbnailHtml(): string;
    move(x: any, y: any): void;
    setCoordinate(e: any): {
        x: number;
        y: number;
    };
    getCoordinateData(): {
        originWidth: any;
        originHeight: any;
        width: number;
        height: number;
        x: number;
        y: number;
        src: string;
    };
    addListenMotd(): void;
    updataImage(settings: any): void;
    static Guid(): number;
}
export declare let proportion: typeof proportions;
export {};
