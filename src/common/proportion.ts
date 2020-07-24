///<reference path="../languages/language.d.ts" />
///<reference path="../indexModel.d.ts" />
import { mergeOptions, addEvent, removeEvent } from './compatible';
import { NodeListToArray } from './obj';
import { installEvents } from './subscrible';
interface proportionsModel extends proportionModel {
    allWidth?: number //上传头像框的总宽  
    allHeight?: number //上传头像框的总高   
    ImageWidth?: number //原图片的宽
    ImageHeight?: number //原图片的高
}
let proportions_guid = 0;
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
class proportions {
    proportions_guid = proportions.Guid()
    data: proportionsModel
    Imgwidths:any
    ImgHeights:any
    Frame:any
    ImgOWidth:any
    ImgOHeight:any
    isDown:any
    MaxLeft:any
    MaxTop:any
    MinLeft:any
    MinTop:any
    oldX:any
    oldY:any
    narrowDomEvent = "narrowDom" //点击缩小的自定义事件
    enlargeDomEvent = "enlargeDom"//点击放大的自定义事件
    installEvents:any = installEvents()
    constructor(data: proportionModel) {
        if (!data.imageUrl || data.imageUrl.length <= 0) {
            throw new Error(fxLanguage.proportion.noImg);
        }

        if (!data.parentEle || !/\[object HTML.*Element\]/.test(Object.prototype.toString.call(data.parentEle))) {
            throw new Error(fxLanguage.proportion.noParentEle);
        }
        let that = this;
        that.data = {
            parentEle: document.body,
            imageUrl: '',
            thumbnailSize: [120, 80, 40],
            ImageWidth: 2613,
            ImageHeight: 1531,
            InterceptWidth: 400,
            InterceptHeight: 400,
            VirtualEdge: 50,
            Wheel: 10,
            Isthumbnail: true,
            BrokerRadius: false
        }
        that.init(data);
        setTimeout(() => {
            that.LisntEvent();
        }, 0);
    }

    LisntEvent() {
        let that = this;
        that.installEvents.listen(that.narrowDomEvent, that.ImgNarrow.bind(that));
        that.installEvents.listen(that.enlargeDomEvent, that.ImgEnlarge.bind(that));

        that.data.narrowDom && addEvent(that.data.narrowDom, "click", function () { that.installEvents.trigger(that.narrowDomEvent) });
        that.data.enlargeDom && addEvent(that.data.enlargeDom, "click", function () { that.installEvents.trigger(that.enlargeDomEvent) });

    }

    init(data:any) {
        let that = this;
        that.data = <proportionModel>mergeOptions({}, that.data, data);

        that.data.allWidth = that.data.InterceptWidth + that.data.VirtualEdge * 2;
        that.data.allHeight = that.data.InterceptHeight + that.data.VirtualEdge * 2;


        that.data.parentEle.innerHTML = this.html();
        that.MouseWheel("UploadContent" + that.proportions_guid);

        that.Frame = <HTMLElement>that.data.parentEle.querySelector('.uploadContent');
        that.ImgOWidth = that.Frame.querySelector('img').naturalWidth;
        that.ImgOHeight = that.Frame.querySelector('img').naturalHeight;
        that.isDown = false;
        that.MaxLeft = 0;
        that.MaxTop = 0;
        that.MinLeft = that.Frame.offsetWidth - that.Frame.querySelector('img').offsetWidth;
        that.MinTop = that.Frame.offsetHeight - that.Frame.querySelector('img').offsetHeight;
        that.oldX = 0;
        that.oldY = 0;
        that.Imgwidths = that.ImgOWidth - (2 * that.data.VirtualEdge);
        that.ImgHeights = that.ImgOHeight - (2 * that.data.VirtualEdge);
        that.Frame.querySelector("img").onload = function (e:any) {
            that.ImgOWidth = that.Frame.querySelector('img').naturalWidth;
            that.ImgOHeight = that.Frame.querySelector('img').naturalHeight;
            // that.Imgwidths = that.ImgOWidth - (2 * that.data.VirtualEdge);
            // that.ImgHeights = that.ImgOHeight - (2 * that.data.VirtualEdge);
            e.stopPropagation();
            that.LoadImgCb(0, 0);
            that.data.zoomCallback && that.data.zoomCallback(that.getCoordinateData());
        }

        that.addListenMotd();

    }

    //主窗体的头像图片
    html() {
        let t = this.data.VirtualEdge;
        let r = this.data.allWidth - this.data.VirtualEdge;
        let b = this.data.allHeight - this.data.VirtualEdge;
        let l = this.data.VirtualEdge;
        let BrokerRadiusHtml;
        if (this.data.BrokerRadius) {
            let BrokersRadius_height: number = this.data.allHeight - (this.data.VirtualEdge * 2);
            let BrokersRadius_width: number = this.data.allWidth - (this.data.VirtualEdge * 2);
            BrokerRadiusHtml = '<div style="height: ' + BrokersRadius_height + 'px; width: ' + BrokersRadius_width + 'px; position: absolute; left: -' + BrokersRadius_width / 2 + 'px;  top: -' + BrokersRadius_height / 2 + 'px; border: ' + this.data.allHeight / 2 + 'px solid rgba(0, 0, 0, 0.35); border-radius: 50%; z-index: 101;"></div>';
        } else {
            BrokerRadiusHtml = "";
        }

        var html = ' <div class="uploadContent" id="UploadContent' + this.proportions_guid + '" style="position: relative; height:' + this.data.allHeight + 'px;width: ' + this.data.allWidth + 'px; overflow: hidden;">'
            + BrokerRadiusHtml
            + '<img src="' + this.data.imageUrl + '"  style="position: absolute; padding:' + this.data.VirtualEdge + 'px; left: 0;top: 0; opacity: 0.6; filter: progid:DXImageTransform.Microsoft.Alpha(opacity=30); min-height: ' + (this.data.InterceptHeight) + 'px; min-width: ' + (this.data.InterceptWidth) + 'px;-moz-box-sizing: border-box;  -webkit-box-sizing: border-box; -o-box-sizing: border-box; -ms-box-sizing: border-box; box-sizing: border-box;" />'
            + ' <img src="' + this.data.imageUrl + '"  class="clip" style="z-index: 100; padding:' + this.data.VirtualEdge + 'px; position: absolute; left: 0px; top: 0px; clip: rect(' + t + 'px ' + r + 'px ' + b + 'px ' + l + 'px); min-height: ' + (this.data.InterceptHeight) + 'px; min-width: ' + (this.data.InterceptWidth) + 'px;-moz-box-sizing: border-box;  -webkit-box-sizing: border-box; -o-box-sizing: border-box; -ms-box-sizing: border-box; box-sizing: border-box;">'
            + '</div>';
        return html;
    }

    //上下滚动事件的兼容
    MouseWheel(id:any) {
        var oDiv = document.getElementById(id);
        let that = this;
        function onMouseWheel(ev:any) {/*当鼠标滚轮事件发生时，执行一些操作*/
            var ev = ev || window.event;
            var down = true; // 定义一个标志，当滚轮向下滚时，执行一些操作
            down = ev.wheelDelta ? ev.wheelDelta < 0 : ev.detail > 0;
            if (down) {

                that.ImgNarrow();
            } else {
                that.ImgEnlarge();
            }
            if (ev.preventDefault) {/*FF 和 Chrome*/
                ev.preventDefault();// 阻止默认事件
            }
            return false;
        }
        addEvent(oDiv, 'mousewheel', onMouseWheel);
        addEvent(oDiv, 'DOMMouseScroll', onMouseWheel);
    }

    //放大
    ImgEnlarge() {
        let that = this;
        let parentEle = <HTMLElement>that.data.parentEle,
            width = parentEle.querySelector('img').width,
            height = parentEle.querySelector('img').height,
            left = parentEle.querySelector('img').style.left,
            top = parentEle.querySelector('img').style.top;
        if (width < this.ImgOWidth && height < this.ImgOHeight) {
            let w = Math.min(that.data.Wheel, that.ImgOWidth - width, that.ImgOHeight - height);
            let imgAry = parentEle.querySelectorAll("img");
            for (let i = 0; i < imgAry.length; i++) {
                let img = <HTMLImageElement>imgAry[i];
                img.style.width = width + w + (that.data.VirtualEdge * 2) + "px";
            }
            that.LoadImgCb(left, top);
            that.data.zoomCallback && that.data.zoomCallback(that.getCoordinateData());
        }

    }

    //缩小
    ImgNarrow() {
        var that = this,
            parentEle = <HTMLElement>that.data.parentEle,
            width = parentEle.querySelector('img').width,
            height = parentEle.querySelector('img').height,
            left: any = parentEle.querySelector('img').style.left,
            top: any = parentEle.querySelector('img').style.top;
        if (width > that.data.InterceptWidth && height > that.data.InterceptHeight) {
            var w = width - Math.min(that.data.Wheel, width - that.data.InterceptWidth, height - that.data.InterceptHeight) + (that.data.VirtualEdge * 2),
                h = height - Math.min(that.data.Wheel, width - that.data.InterceptWidth, height - that.data.InterceptHeight) + (that.data.VirtualEdge * 2),
                pyw = that.data.InterceptWidth+ (that.data.VirtualEdge * 2) - (w + parseFloat(left)),
                pyh = that.data.InterceptHeight+ (that.data.VirtualEdge * 2) - (h + parseFloat(top));

            if (pyw > 0) {
                left = parseFloat(left) + pyw;
            }
            if (pyh > 0) {
                top = parseFloat(top) + pyh;
            }

            let imgAry = parentEle.querySelectorAll('img')
            for (let i = 0; i < imgAry.length; i++) {
                let img = <HTMLImageElement>imgAry[i];
                img.style.width = w + "px";
                img.style.left = left + "px";
                img.style.top = top + "px";
            }

            that.LoadImgCb(parseFloat(left), parseFloat(top));
            that.data.zoomCallback && that.data.zoomCallback(that.getCoordinateData());
        }

    }


    LoadImgCb(l:any, t:any) {
        this.MinLeft = this.Frame.offsetWidth - this.Frame.querySelector('img').offsetWidth;
        this.MinTop = this.Frame.offsetHeight - this.Frame.querySelector('img').offsetHeight;
        this.data.ImageWidth = this.Frame.querySelector('img').width;
        this.data.ImageHeight = this.Frame.querySelector('img').height;

        if (this.data.Isthumbnail) {
            if (this.data.parentEle.querySelectorAll('.preview').length <= 0) {
                this.data.parentEle.insertAdjacentHTML("beforeend", this.thumbnailHtml())
            }

        }

        if (l != 'undefined' && t != 'undefined') {
            this.setClip(l, t);
        }
        else {
            this.setClip(0, 0);
        }
        this.thumbailSize();
    }
    //js 截取的坐标
    setClip(x:any, y:any) {
        var t = this.data.VirtualEdge - y + "px",
            r = this.data.allWidth - this.data.VirtualEdge - x + "px",
            b = this.data.allHeight - this.data.VirtualEdge - y + "px",
            l = this.data.VirtualEdge - x + "px";
        let clip = this.Frame.querySelector('.clip');
        clip.style.clip = 'rect(' + t + ' ' + r + ' ' + b + ' ' + l + ')';
        this.move(x, y);
    }

    //放大缩小缩略图跟着变化
    thumbailSize() {
        if (this.data.thumbnailSize.length > 0) {
            for (var i = 0; i < this.data.thumbnailSize.length; i++) {
                var theight = this.data.thumbnailSize[i] * (this.data.InterceptHeight / this.data.InterceptWidth),
                    imgwidth = this.data.thumbnailSize[i] / this.data.InterceptWidth * this.data.ImageWidth,
                    imgheight = theight / this.data.InterceptHeight * this.data.ImageHeight,
                    Proportion = this.data.thumbnailSize[i] / this.data.InterceptWidth;
                let img = this.data.parentEle.querySelector('#img' + this.data.thumbnailSize[i]).querySelector("img");
                img.style.width = imgwidth + "px";
                img.style.height = imgheight + "px";
            }
        }
    }
    //缩略图
    thumbnailHtml() {
        let that = this;
        var html = "<div class='preview'>";
        for (var i = 0; i < that.data.thumbnailSize.length; i++) {
            var theight = that.data.thumbnailSize[i] * (that.data.InterceptHeight / that.data.InterceptWidth),
                imgwidth = that.data.thumbnailSize[i] / that.data.InterceptWidth * that.data.ImageWidth,
                imgheight = theight / that.data.InterceptHeight * that.data.ImageHeight,
                Proportion = that.data.thumbnailSize[i] / that.data.InterceptWidth;
            html += '<div class="img' + that.data.thumbnailSize[i] + '" id="img' + that.data.thumbnailSize[i] + '" style="position:relative; overflow: hidden;width:' + that.data.thumbnailSize[i] + 'px;height:' + theight + 'px; ">'
                + '<img src="' + that.data.imageUrl + '" data-proportion="' + Proportion + '" data-imagewidth="' + that.data.ImageWidth + '" data-imageheight = "' + that.data.ImageHeight + '" style="width:' + imgwidth + 'px;height:' + imgheight + 'px;position:absolute;left:0;top:0; " />'
                + '</div>';
        }
        html += "</div>";
        return html;
    }
    
    move(x:any, y:any) {
        let parentEle = <HTMLElement>this.data.parentEle;
        if (this.data.Isthumbnail) {
            let imgAry = NodeListToArray(parentEle.querySelectorAll('.preview img'));

            for (let i = 0; i < imgAry.length; i++) {
                let that = <HTMLElement>imgAry[i];
                var Proportion = parseFloat(that.getAttribute("data-proportion")),
                    l = Proportion * x,
                    t = Proportion * y;
                that.style.left = l + "px";
                that.style.top = t + "px";
            }
        }

    }

    // 计算移动后的坐标
    setCoordinate(e:any) {
        let that = this;
        var x = parseInt(that.Frame.querySelector('img').style.left) + parseInt(e.pageX) - that.oldX, y = parseInt(that.Frame.querySelector('img').style.top) + parseInt(e.pageY) - that.oldY;

        if (x < that.MinLeft) {
            x = that.MinLeft
        } else if (x > that.MaxLeft) {
            x = that.MaxLeft
        }

        //  $('span').text(e.pageX + ":" +oldX + ":"  +x + ":" + MinLeft);
        if (y < that.MinTop) {
            y = that.MinTop
        }
        else if (y > that.MaxTop) {
            y = that.MaxTop
        }

        return { x: x, y: y }
    }

    getCoordinateData() {
        let that = this;
        let img = <HTMLImageElement>that.Frame.querySelector('.clip');
        let width = img.width;  //缩略图的宽
        let height = img.height;//缩略图的高
        let CoordinateX = parseInt(img.style.left) >= 0 ? parseInt(img.style.left) : -parseInt(img.style.left);//截取的X坐标
        let CoordinateY = parseInt(img.style.top) >= 0 ? parseInt(img.style.top) : -parseInt(img.style.top);//截取的Y坐标
        let imageUrl = img.getAttribute("src"); //图片地址
        return {
            originWidth: that.ImgOWidth,
            originHeight: that.ImgOHeight,
            width: width,
            height: height,
            x: CoordinateX,
            y: CoordinateY,
            src: imageUrl
        }
    }


    addListenMotd() {
        let that = this;
        let onmousedown: any = that.Frame.onmousedown;
        that.Frame.onmousedown = function (e:any) {
            onmousedown && onmousedown();
            that.oldX = e.pageX;
            that.oldY = e.pageY;
            that.isDown = true;
            return false;
        }
        let onmouseup: any = document.onmouseup;
        document.onmouseup = function () {
            onmouseup && onmouseup();
            if (!that.isDown) return;
            that.isDown = false;
            that.data.zoomCallback && that.data.zoomCallback(that.getCoordinateData());
        }

        let onmousemove: any = document.onmousemove;
        document.onmousemove = function (ev:any) {
            onmousemove && onmousemove();
            let e: any = ev || event;
            if (that.isDown) {
                var Coordinate = that.setCoordinate(e);

                that.setClip(Coordinate.x, Coordinate.y);


                let imgAry = that.Frame.querySelectorAll('img');
                for (let i = 0; i < imgAry.length; i++) {
                    let img = <HTMLImageElement>imgAry[i];
                    img.style.left = Coordinate.x + "px";
                    img.style.top = Coordinate.y + "px";
                }
                that.oldX = e.pageX;
                that.oldY = e.pageY;
                that.data.mousemoveCallback && that.data.mousemoveCallback(that.getCoordinateData());
            }
            return false;
        }





    }

    updataImage(settings:any) {
        this.init(settings);
    }

    static Guid() {
        return ++proportions_guid;
    }

}


export let proportion = proportions