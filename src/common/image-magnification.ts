import { mergeOptions, index, addEvent } from './compatible';
import { createEl, show, parent, hide, remove } from './dom';
import { on } from "./event";
import { NodeListToArray, each } from './obj';
import { installEvents } from './subscrible';

let prevClick = "prevClick";
let nextClick = "nextClick";
let closeClick = "closeClick";
let imgResize = "imgResize";
let events = installEvents();
let IMG_BOX_BG = "imgViewerBoxBg"; // 展示时的透明背景层
let IMG_BOX = "imgViewerBox"; // 展示时的内容层
let IMG_ID = "fullResImg"; // 图片标签ID
let sWidth = window.innerWidth // 窗口宽度
let sHeight = window.innerHeight // 窗口高度


class imgMagnificationFn {
    settings:any //所有的参数
    $win = window.parent.window || window//window元素
    parentEle:any  //父级容器元素
    _allIndex:any //图片的长度
    body = document.querySelector("body") //body元素
    IMG_ID_TITLE = "imgTitleCont" // 图片标题标签ID
    IMG_ID_CLOSE = "imgClose" // 关闭标签ID

    IMG_PREV_ID = "imgPrev" // 上一张链接ID
    IMG_NEXT_ID = "imgNext" // 下一张链接ID
    IMG_VIEWER_LIST = "imgViewerList" //图片的父级标签ID
    index = 0 // 当前图片索引
    imgUrlArry:Array<string> = [] // 存放图片地址数组
    imgTitleArry:Array<string> = [] // 存放图片标题数组
    ImgIndex:any = {}
    constructor(options:any) {
        let that = this;
        that.$win = window.parent.window || window;
        that.settings = mergeOptions({}, {
            isPaging: true,//是否需要翻页
            prevBgImg: "https://gafxchatimage.fx110.com/api/secrecymaster/html_up/2018/10/20181009152904076.png", // 上一张按钮图片
            nextBgImg: "https://gafxchatimage.fx110.com/api/secrecymaster/html_up/2018/10/20181009152928779.png", // 下一张按钮图片
            closeBgImg: "https://gafxchatimage.fx110.com/api/secrecymaster/html_up/2019/5/20190517151007376.png", // 关闭按钮图片
            parentEle: "",
            IsBox: true //是否需要显示背景
        }, options);

        that.parentEle = <HTMLElement>that.settings.parentEle //父级容器元素
       


        if (!that.settings.parentEle) return;

        that.init();



    }



    init() {
        let that = this;
        that.imgStyle();

        on({
            agent: that.parentEle,
            events: "click",
            ele: "[data-viewer]",
            fn: function (dom:any, ev:any) {
                events.remove(prevClick);
                events.remove(nextClick);
                events.remove(closeClick);
                events.remove(imgResize);
                events.listen(prevClick, function () {
                    that.prevClick.call(that)
                })

                events.listen(nextClick, function () {
                    that.nextClick.call(that)
                })

                events.listen(closeClick, function () {
                    that.closeClick.call(that)
                })
                events.listen(imgResize, function () {
                    that.onresize.call(that)
                })
                that._allIndex = that.settings.parentEle.querySelectorAll("img[data-viewer]").length;//图片的长度
                let e = ev || event;
                let ele: HTMLElement = e.target || e.srcElement;
                if (!ele.getAttribute("data-viewer") && ele.querySelectorAll("[data-viewer]").length <= 0) { return false }

                if (e && e.preventDefault) { ev.preventDefault() } else { window.event.returnValue = false };
                if (ele.nodeName === "INPUT") { return false }

                var imgMaxUrl = ele.getAttribute("href") || ele.getAttribute("data-viewer") || ele.getAttribute("src");
                that.index = index(ele);
                sWidth = that.$win.innerWidth;
                sHeight = that.$win.innerHeight;
                // that.imgStyle();
                that.getImgOrTitle();
                that.index = that.ImgIndex[ele.getAttribute('data-imgindex')];
                that.imgClick(imgMaxUrl);

            }


        })
    }

    // 获取图片大图地址及图片标题，并提前缓存图片
    getImgOrTitle() {
        var that = this;
        var i = 0;
        that.imgUrlArry = [];
        that.imgTitleArry = [];
        that.ImgIndex = {};
        each(NodeListToArray(that.parentEle.querySelectorAll('img')), function (value:any, index:any) {
            if ((<HTMLElement>value).getAttribute("data-viewer")) {

                var $this = <HTMLElement>value, imgMax = [],
                    _title_text = $this.getAttribute("title") || "",
                    _realIndex = parseInt(index) + 1,
                    title_num = '<p style="display: inline-block; margin: 5px 20px 5px 0;"><span style="color: red; font-size: 28px; font-style: italic;">' + _realIndex + '</span><em style="font-style: italic; margin-left: 3px; margin-right: 1px; font-size: 24px;">|</em><span style="position:relative;top:5px;font-style: italic;">' + that._allIndex + '</span></p>',
                    title_text = '<p style="display: inline-block;margin: 5px;"><span style="word-break:break-all">' + _title_text + '</span></p>',
                    _title = title_num + title_text,
                    imgurl = $this.getAttribute("data-viewer") || $this.getAttribute("src");
                $this.setAttribute('data-imgindex', index);

                imgMax[index] = new Image();
                imgMax[index].src = imgurl;
                //imgMax[index].onload = function () { console.log("加载完成") }
                that.ImgIndex[index] = i;
                i++;
                that.imgUrlArry.push(imgurl);
                that.imgTitleArry.push(_title);
            }
        })
    }

    // 获取图片高宽，返回包含高度的对象
    getImageSize(url:string) {
        var that = this,
            maxWidth = sWidth * 0.8,
            maxHeight = sHeight - 50,
            //w = o.find("#" + IMG_ID).width(),    
            //h = o.find("#" + IMG_ID).height();
            boxWidth = (<HTMLImageElement>document.getElementById(IMG_ID)).naturalWidth ? (<HTMLImageElement>document.getElementById(IMG_ID)).naturalWidth : (<HTMLImageElement>document.getElementById(IMG_ID)).width,
            boxHeight = (<HTMLImageElement>document.getElementById(IMG_ID)).naturalHeight ? (<HTMLImageElement>document.getElementById(IMG_ID)).naturalHeight : (<HTMLImageElement>document.getElementById(IMG_ID)).height,
            w = (<HTMLImageElement>document.getElementById(IMG_ID)).naturalWidth ? (<HTMLImageElement>document.getElementById(IMG_ID)).naturalWidth : (<HTMLImageElement>document.getElementById(IMG_ID)).width,
            h = (<HTMLImageElement>document.getElementById(IMG_ID)).naturalHeight ? (<HTMLImageElement>document.getElementById(IMG_ID)).naturalHeight : (<HTMLImageElement>document.getElementById(IMG_ID)).height;
        if (h > maxHeight) {
            w = (maxHeight * boxWidth / boxHeight);
            h = maxHeight
        }
        if (w > maxWidth) {
            w = maxWidth;
            h = (maxWidth * boxHeight / boxWidth)
        }
        return { w: w, h: h }
    }

    // 获取图片顶部位置 返回顶部值
    getTop(h:number) {
        if (sHeight > h) {
            return sHeight / 2 - h / 2;
        } else {
            return 0;
        }
    }

    // 获取图片左边位置 返回左边值
    getLeft(w:number) {
        if (sWidth > w) {
            return sWidth / 2 - w / 2;
        } else {
            return 0;
        }
    }

    // 初始DOM样式
    imgStyle() {
        var that = this;
        var $imgBoxBg = <HTMLElement>that.body.querySelector("#" + IMG_BOX_BG),
            $imgBox = <HTMLElement>that.body.querySelector("#" + IMG_BOX),
            ScrollTop = document.querySelector("body,html").scrollTop <= 20 ? 20 : document.querySelector("body,html").scrollTop;
        // 展示时的内容层样式
        $imgBox.style.position = "fixed";
        $imgBox.style.top = "0";
        $imgBox.style.left = "0";
        $imgBox.style.width = "100%";
        $imgBox.style.minHeight = sHeight + "px";
        $imgBox.style.zIndex = "20160901";

        // 展示时的透明背景层样式
        $imgBoxBg.style.position = "fixed";
        $imgBoxBg.style.top = "0";
        $imgBoxBg.style.left = "0";
        $imgBoxBg.style.width = "100%";
        $imgBoxBg.style.height = "100%";
        $imgBoxBg.style.background = "#000";
        $imgBoxBg.style.opacity = "0.6";
        $imgBoxBg.style.zIndex = "20160900";
        $imgBoxBg.style.overflow = "hidden";





    }

    imgResize(imgUrl:string) {
        var that = this;
        var $imgID = <HTMLElement>that.body.querySelector("#" + IMG_ID),
            $imgIDTitle = <HTMLElement>that.body.querySelector("#" + that.IMG_ID_TITLE),
            $imgPrev = <HTMLElement>that.body.querySelector("#" + that.IMG_PREV_ID),
            $imgNext = <HTMLElement>that.body.querySelector("#" + that.IMG_NEXT_ID),
            $imgIDClose = <HTMLElement>that.body.querySelector("#" + that.IMG_ID_CLOSE),
            $imgBoxBg = <HTMLElement>that.body.querySelector("#" + IMG_BOX_BG),
            $imgBox = <HTMLElement>that.body.querySelector("#" + IMG_BOX);



        var imgSize = that.getImageSize(imgUrl);
        var top = imgSize.h >= sHeight ? 5 : that.getTop(imgSize.h);
        var tw = (sWidth - 100 <= imgSize.w) ? sWidth - 100 : imgSize.w;
        var left = tw >= sWidth ? 100 : that.getLeft(tw);

        // 设置图片样式
        $imgID.style.maxWidth = imgSize.w + "px";
        $imgID.style.maxHeight = imgSize.h + "px";
        $imgID.style.position = "absolute";
        $imgID.style.top = top + "px";
        $imgID.style.left = left + "px";
        $imgID.style.cursor = "zoom-out";
        $imgID.style.cursor = "-webkit-zoom-out";
        $imgID.style.display = "block";
        $imgID.style.margin = "auto";

        // 关闭层样式
        $imgIDClose.style.width = "20px";
        $imgIDClose.style.height = "20px";
        $imgIDClose.style.position = "absolute";
        $imgIDClose.style.top = top - 10 + "px";
        $imgIDClose.style.left = left + tw - 10 + "px";
        $imgIDClose.style.zIndex = "20181115";
        $imgIDClose.style.cursor = "pointer";
        $imgIDClose.style.display = "none";
        $imgIDClose.innerHTML = that.settings.closeBgImg ? '<img width="20" src="' + that.settings.closeBgImg + '" />' : 'close';

        // 图片标题层样式
        $imgIDTitle.style.position = "absolute";
        $imgIDTitle.style.color = "#fff";
        $imgIDTitle.style.width = "100%";
        $imgIDTitle.style.textAlign = "left";
        $imgIDTitle.style.padding = "10px";
        $imgIDTitle.style.bottom = "0px";
        $imgIDTitle.style.left = "0";
        $imgIDTitle.style.right = "0";
        $imgIDTitle.style.boxSizing = "border-box";
        $imgIDTitle.style.webkitBoxSizing = "border-box";
        $imgIDTitle.style.overflow = "hidden";
        $imgIDTitle.style.lineHeight = "22px";
        $imgIDTitle.style.background = "rgba(0,0,0,0.5)";
        $imgIDTitle.style.fontSize = "14px";
        $imgIDTitle.innerHTML = that.imgTitleArry[that.index] || "";

        // 上一张层样式
        $imgPrev.style.top = "0";
        $imgPrev.style.left = "0";
        $imgPrev.innerHTML = that.settings.prevBgImg ? '<div style="text-align: center; margin-top:' + (sHeight - 60) / 2 + 'px ;"> <img width="20" height="60" src="' + that.settings.prevBgImg + '"> </div>' : 'prev';

        $imgNext.style.top = "0";
        $imgNext.style.right = "0";
        $imgNext.innerHTML = that.settings.nextBgImg ? '<div style="text-align: center; margin-top:' + (sHeight - 60) / 2 + 'px ;"> <img width="20" height="60" src="' + that.settings.nextBgImg + '"> </div>' : 'prev';
        try {
            if (!that.settings.isPaging) {
                hide($imgPrev);
                hide($imgNext);
                hide($imgIDTitle.firstElementChild);
            } else {
                show($imgPrev);
                show($imgNext);
                show($imgIDTitle.firstElementChild);
            }
        } catch (e) { }

        show($imgBoxBg);
        show($imgBox);


    }

    onresize(imgUrl:string) {
        let that = this;
        let $imgIDClose = <HTMLElement>that.body.querySelector("#" + that.IMG_ID_CLOSE);
        let $imgID = <HTMLElement>that.body.querySelector("#" + IMG_ID);
        var imgSize = that.getImageSize(imgUrl);
        var top = imgSize.h >= sHeight ? 5 : that.getTop(imgSize.h);
        var tw = (sWidth - 100 <= imgSize.w) ? sWidth - 100 : imgSize.w;
        var left = tw >= sWidth ? 100 : that.getLeft(tw);

        // 设置图片样式
        $imgID.style.maxWidth = imgSize.w + "px";
        $imgID.style.maxHeight = imgSize.h + "px";
        $imgID.style.top = top + "px";
        $imgID.style.left = left + "px";
        // 关闭层样式
        $imgIDClose.style.top = top - 10 + "px";
        $imgIDClose.style.left = left + tw - 10 + "px";


    }

    // 显示图片事件
    imgClick(imgUrl:string) {
        var that = this;
        var $imgID = <HTMLElement>that.body.querySelector("#" + IMG_ID);

        setTimeout(function () { $imgID.setAttribute("src", imgUrl) }, 200);

        $imgID.onload = function () {  // 在IE下必须设置延迟，否则读取图片信息会出错

            that.imgResize(imgUrl);
            if (that.settings.IsBox) {
                show(document.querySelector('#' + IMG_BOX_BG))
            } else {
                hide(document.querySelector('#' + IMG_BOX_BG))
            }
            $imgID.onclick = function () { that.closeClick.call(that) }

            $imgID.onmouseover = function () { show(document.querySelector('#' + that.IMG_ID_CLOSE)); };

            //$imgID.hover(function () { $('#' + setImage.IMG_ID_CLOSE).show(); });
        }
    }

    // 上一张
    prevClick() {
        let that = this;
        if (that.index <= 0) {
            //return false
            that.index = that._allIndex;
        }
        var $imgID = that.body.querySelector("#" + IMG_ID);
        hide($imgID);
        var imgUrl = that.imgUrlArry[--that.index];
        this.imgClick(imgUrl);
    }

    // 下一张
    nextClick() {
        let that = this;
        if (that.index >= that.imgUrlArry.length - 1) {
            //return false
            that.index = -1;
        }
        var $imgID = that.body.querySelector("#" + IMG_ID);
        hide($imgID);
        var imgUrl = that.imgUrlArry[++that.index];
        this.imgClick(imgUrl);
        //$imgID.fadeIn();
    }

    // 关闭事件
    closeClick() {
        let that = this;
        hide(that.body.querySelector("#" + IMG_BOX_BG));
        hide(that.body.querySelector("#" + IMG_BOX))
    }
}


let imgHtml = <HTMLElement>createEl("div", { // 初始化弹层DOM
    id: "imgViewerBox",
    innerHTML: '<div id="imgViewerList">'
        + '<div>'
        + '<div id="imgClose">close</div>'
        + '<img id="fullResImg" src="" style="display:none;" />'
        + '<div id="imgTitleCont"></div>'
        + '</div>'
        + '<div id="imgTitleContBg" style="display:none"></div>'
        + '</div>'
        + '<div id="imgPrev" style="display:none; background-color: rgba(0, 0, 0,.1); position:fixed; width:10%; height:100%; ;cursor:pointer;">prev</div>'
        + '<div id="imgNext" style="display:none; background-color: rgba(0, 0, 0,.1); position:fixed; width:10%; height:100%; ;cursor:pointer;">next</div>'
        + '</div>'
})
let imgBoxBg = <HTMLElement>createEl("div", {
    id: "imgViewerBoxBg"
})
imgHtml.style.fontSize = "14px";
imgHtml.style.display = "none";
imgBoxBg.style.display = "none";


let onresize: any = window.onresize;
window.onresize = function () {
    onresize && onresize();
    let ele = (<HTMLElement>document.querySelector("#" + IMG_BOX_BG));
    if (!ele) return;

    sWidth = window.innerWidth;
    sHeight = window.innerHeight;
    ele.style.width = "100%";
    ele.style.height = "100%";

    events.trigger(imgResize, document.querySelector("#" + IMG_ID).getAttribute("data-viewer"));
}


interface imgMagnificationModel{
    parentEle:any;
    prevBgImg:string;
    nextBgImg:string;
    closeBgImg:string;
    IsBox:boolean;
    isPaging:boolean;
}

/**
 * 图片放大 带单图和多图的
 *    <img src="" title="描述" data-viewer="大图">
 * 
 * @param {object} options {parentEle:parentEle,prevBgImg:prevBgImg,nextBgImg:nextBgImg,closeBgImg:closeBgImg,IsBox:IsBox,isPaging:isPaging}
        * @param {Element|string|Array<Element>|Array<string>} parentEle 图片集合的父元素或者元素字符串
        * @param {string} prevBgImg 上一张按钮图片 默认有图片
        * @param {string} nextBgImg 下一张按钮图片 默认有图片
        * @param {string} closeBgImg 关闭按钮图片 默认有图片
        * @param {boolean} IsBox 是否需要显示背景 默认true
        * @param {boolean} isPaging 是否需要翻页 默认true
 * example
 *  <div id="solo1">
      <div class="Imgms">
          <img src="http://upload.fx110.com/files/thumbnail/201702/529CFE3C42BC3F613FCCE51B8D0F4B94.png" title="dfasdfad1sf" data-viewer="https://cdn-flash.jin10.com/b230ba5d-48a2-4d9f-bd96-98cf85737104.png">
      </div>
      <div class="Imgms">
          <img src="http://upload.fx110.com/files/thumbnail/201702/529CFE3C42BC3F613FCCE51B8D0F4B94.png" title="dfasdfa2dsf" data-viewer="http://upload.fx110.com/files/thumbnail/201702/529CFE3C42BC3F613FCCE51B8D0F4B94.png">
      </div>
      <div class="Imgms">
          <img src="http://upload.fx110.com/files/thumbnail/201702/529CFE3C42BC3F613FCCE51B8D0F4B94.png" title="dfasdfa3dsf" data-viewer="http://upload.fx110.com/files/thumbnail/201702/529CFE3C42BC3F613FCCE51B8D0F4B94.png">
      </div>
      <p>asdfsdfasdfsdfsdf</p>
  </div>

  fx.imgMagnification({parentEle:document.getElementById("solo1")})
 */
export const imgMagnification = function (options:imgMagnificationModel) {
    if (!options.parentEle) return;
    if (imgHtml && imgBoxBg) {
        document.body.appendChild(imgHtml);
        document.body.appendChild(imgBoxBg);
        imgHtml = imgBoxBg = null;
        let $imgIDClose = document.body.querySelector("#imgClose");
        let $imgPrev = document.body.querySelector("#imgPrev");

        let $imgNext = document.body.querySelector("#imgNext");


        // 注册上一张事件
        addEvent($imgPrev, "click", function () {
            events.trigger("prevClick");
        })
        addEvent($imgNext, "click", function () {
            events.trigger("nextClick");
        })
        // 注册关闭事件
        addEvent($imgIDClose, "click", function () {
            hide(document.body.querySelector("#" + IMG_BOX_BG));
            hide(document.body.querySelector("#" + IMG_BOX))
        })


    }





    let eleAry = Object.prototype.toString.call(options.parentEle) === "[object Array]" ? options.parentEle : [options.parentEle];
    for (let i = 0; i < eleAry.length; i++) {
        let ele = eleAry[i];
        if (!/\[object HTML.*Element\]/.test(Object.prototype.toString.call(ele))) {
            ele = document.querySelector(ele);
        }

        if (!ele) break;
        let object = JSON.parse(JSON.stringify(options));
        object.parentEle = ele;
        new imgMagnificationFn(object);

    }
}