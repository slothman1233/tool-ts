import { addEvent } from "./compatible"
import { computedStyle } from "./computed-style"

// <style>
//    .main {
//       margin-top: 30px;
//       width: 300px;
//       overflow: hidden;
//       position: relative
//   }

//    .main .prev, .main .next {
//       position: absolute;
//       background: rgba(255,255,255,0.2);
//       padding: 5px;
//       margin-top: -50px;
//       top: 50%;
//       z-index: 999;
//       cursor: pointer
//   }

//    .main .prev img, .main .next img {
//       width: 20px
//   }

//    .main .prev {
//       left: 5px
//   }

//    .main .next {
//       right: 5px
//   }

//    .main ul {
//       position: relative;
//       height: 210px;
//       overflow: hidden
//   }

//    .main ul li {
//       width: 300px;
//       float: left;
//       position: relative;
//       height: 210px
//   }

//    .main ul li img {
//       width: 100%;
//       height: 210px
//   }

//    .main ul li p {
//       margin-top: 15px;
//       overflow: hidden;
//       white-space: nowrap;
//       text-overflow: ellipsis;
//       width: 100%;
//       position: absolute;
//       bottom: 0;
//       background: rgba(0,0,0,0.4);
//       padding: 5px;
//       text-align: center;
//       color: #fff
//   }

//    dl {
//       margin: 10px 0;
//       padding: 0 10px
//   }

//    dl dd {
//       width: 6px;
//       height: 6px;
//       -moz-border-radius: 3px !important;
//       -webkit-border-radius: 3px !important;
//       border-radius: 3px !important;
//       background: #ddd;
//       display: inline-block;
//       margin-right: 5px;
//       cursor: pointer;
//       *display:inline;
//       *zoom:1;
//   }

//    dl dd.active {
//       background: #666;
//       transform: scale(1.2);
//       -moz-border-radius: 4px !important;
//       -webkit-border-radius: 4px !important;
//       border-radius: 4px !important
//   }

// </style>


// <div id="main" class="main">
//   <div class="prev" id="prev"><img src="/Images/imgPrev.png"> </div>
//   <div class="next" id="next"><img src="/Images/imgNext.png"> </div>
//   <ul class="slide">
//     <li>
//       <img src="http://upload.fx110.com/files/thumbnail/201612/9CD53FB20C0F57D3122F576BCEC0CC06Thumbnail.jpg">
//     </li>
//     <li>
//       <img src="http://upload.fx110.com/files/thumbnail/201612/3E3BB12E1657BE9F9B9CB21627005AB5Thumbnail.jpg">
//     </li>
//     <li>
//       <img src="http://upload.fx110.com/files/thumbnail/201612/DBFDA591D4BCAFC06BAFA7CF88BB436FThumbnail.jpg">
//     </li>
//   </ul>
//   <dl class="control">
//     <dd class="active"></dd>
//     <dd></dd>
//     <dd></dd>
//   </dl>
// </div>

//调用方式
// new fx.slidePic({
//     parent:"#main",
//     delayTime: 3000
// })


/**
 * 图片轮播
 * @param {object} json {parent:parent ,delayTime: 3000}
        * @param {Element} parent 父级的元素
        * @param {number} delayTime 自动播放每次时间间隔
 */

//let cache=[];

interface slideModel {
    parent: string;
    delayTime: number
}

function slide(json: any) {



    this.parent = json.parent;

    this.slideArea = this.parent.querySelector(".slide");//获取图片组元素Id
    this.slideControl = this.parent.querySelector(".control");//获取控制组元素Id,默认为control
    this.delay = json.delayTime;//延迟时间
    this.oPrev = this.parent.querySelector(".prev") || null;//获取上一页Id
    this.oNext = this.parent.querySelector(".next") || null;//获取下一页Id
    this.slideWidth//获取宽度
    this.init();//初始化
}

slide.prototype = {
    init: function () {
        this.setParam();//参数设置        
        this.setWidth();//设置宽度
        this.setTimer();//图片自动播放        
        this.slideControl && this.controlSlide();//控制组样式变化

        this.bind();//绑定鼠标移入移出事件
    },
    setParam: function () {
        this.slideArea.innerHTML += this.slideArea.innerHTML;//clone图片组内元素
        this.slideLi = this.slideArea.children;//图片组单个元素
        this.liLen = this.slideLi.length;//图片组元素个数
        this.slideIndex = 0;//初始化索引        
        this.outTimer = null;//初始化定时器 

        if (this.slideControl) {
            this.controlItem = this.slideControl.children;//获取控制组单个元素
        }

    },
    setWidth: function () {
        if (this.slideLi[0].offsetWidth <= 0) return;

        for (var i = 0; i < this.liLen; i++) {
            this.slideLi[i].style.width = this.slideLi[i].offsetWidth + 'px';
        }
        //设置每个元素宽
        this.slideArea.style.width = this.slideLi.length * this.slideLi[0].offsetWidth + 'px';//设置图片组容器宽度

        //  cache.push(this.parent);



        this.slideArea.style.left = 0;
        this.slideArea.style.top = 0;
    },
    controlSlide: function () {
        var that = this;
        //点击控制按钮

        for (var i = 0; i < this.controlItem.length; i++) {
            this.controlItem[i].index = i;//索引值存入index属性
            this.controlItem[i].onclick = function () {
                that.slideIndex = this.index;
                that.slide(that.slideIndex);
            }
        }
    },
    bind: function () {
        var that = this;
        //鼠标移入移出开关轮播
        this.parent.onmouseover = function () {
            clearInterval(that.outTimer);//关闭定时器
        }
        this.parent.onmouseout = function () {
            that.setTimer();//重启定时器
        }
        this.oPrev && addEvent(this.oPrev, 'click', function () {
            that.prev();//点击上一页
        })
        this.oNext && addEvent(this.oNext, 'click', function () {
            that.next();//点击下一页
        })
    },
    setTimer: function () {
        //自动滚动
        var that = this;
        this.outTimer = setTimeout(function () {
            that.next();
            that.setTimer();
        }, that.delay);
    },
    next: function () {
        //往下一页直到最后一页调回第一页循环

        if (this.slideIndex < this.liLen - 1) {
            this.slideIndex++; //索引值加1
        } else {
            //轮播到最后一个时索引值设为后1/2的第一个 图片组左移到前1/2的最后一个 
            this.slideIndex = this.liLen / 2;
            this.slideArea.style.left = -(this.slideIndex - 1) * this.slideLi[0].offsetWidth + 'px';
        }
        this.slide(this.slideIndex);
    },
    prev: function () {
        if (this.slideIndex > 0) {
            this.slideIndex--;
        } else {
            this.slideIndex = this.liLen / 2 - 1;
            this.slideArea.style.left = -(this.slideIndex + 1) * this.slideLi[0].offsetWidth + 'px';
        }
        this.slide(this.slideIndex);
    },
    slide: function (index: any) {
        //水平缓冲移动到相应位置 控制组样式相应变化
        this.startMove(this.slideArea, { 'left': -index * (this.slideLi[0].offsetWidth) });
        if (this.slideControl) {
            this.controlStyle(index);
        }
    },
    controlStyle: function (index: any) {
        //控制点样式变换
        var controlItem = this.controlItem;
        for (var i = 0; i < controlItem.length; i++) {
            controlItem[i].className = '';
        }
        controlItem[index % (this.liLen / 2)].className = 'active';
    },
    startMove: function (obj: any, json: any, fn: any) {
        clearInterval(obj.timer);
        var that = this;
        //缓冲运动
        obj.timer = setInterval(function () {
            var bStop = true;
            for (var attr in json) {
                var iCur = 0;
                if (attr == 'opacity') {
                    iCur = computedStyle(obj, attr) * 100;
                } else {
                    iCur = parseFloat(computedStyle(obj, attr));//获取当前的属性值
                }

                var iSpeed = (json[attr] - iCur) / 6;//设置速度值
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);//速度取整

                if (json[attr] !== iCur) {
                    bStop = false;//是否达到目标值
                }

                if (attr == 'opacity') {//属性值变化
                    obj.style.filter = 'alpha(opacity:' + iCur + iSpeed + ')';
                    obj.style.opacity = (iCur + iSpeed) / 100;
                } else {
                    obj.style[attr] = iCur + iSpeed + 'px';
                }

            }

            if (bStop) {//如果到达目标值 关闭定时器 回调函数
                clearInterval(obj.timer);
                if (fn) {
                    fn();
                }
            }
        }, 30);

    },


}

/**
 * 图片轮播
 * @param {object} json {parent:parent ,delayTime: 3000}
        * @param {string} parent 父级的元素的名称字符串 例如 "#parent .slide"
        * @param {number} delayTime 自动播放每次时间间隔
 */
export function slidePic(json: slideModel) {
    if (!json || !json.parent) return;
    let parent = document.querySelectorAll(json.parent);
    if (!parent) return;

    for (let i = 0; i < parent.length; i++) {
        //  if(cache.indexOf(parent[i]) >=0) continue;
        new (slide as any)({ parent: parent[i], delayTime: json.delayTime });
    }

    return slidePic;

}


