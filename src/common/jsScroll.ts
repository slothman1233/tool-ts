import { eventsPath } from "./event";




export class jsScroll {
    scrollMoveObj:any
    scrollPageY = 0
    scrollY = 0
    fatherScroll = false
    scrollDivList = new Array();
    thatDomHtmlCache = "" //当前元素的html内容

    obj:any
    _obj:any
    // obj需要添加滚动条的对象 w滚动条宽度 className滚动条样式名称
    // obj元素 必须指定高度，并设置overflow:hidden;
    // 如要兼容IE6 必须给obj元素 指定 overflow:hidden; 
    // 当前窗口滚动条到底部后，继续滚动滑轮是否继续滚动条父级的滚动条 
    constructor(obj:any, w:any, className:any, fatherScrolls:any, callback?:any) {
        var that = this;
        //当页面大小发生变化时，重新计算滚动条位置
        let onresizes: any = window.onresize;
        window.onresize = function () {
            onresizes && onresizes();
            that.onsize();
        }

        that.obj = obj;
        that._obj = obj;
        if (typeof (obj) == 'string') {
            obj = document.getElementById(obj);
        }
        //当内容未超出现在高度时，不添加滚动条	
        if (!obj) {
            return;
        }

        that.fatherScroll = fatherScrolls || false;

        obj.scrollBarWidth = w || 6;
        obj.style.overflow = 'hidden';
        obj.scrollBar = document.createElement('div');
        //document.body.appendChild(obj.scrollBar);
        // obj.appendChild(obj.scrollBar);
        document.getElementById(that._obj).insertAdjacentElement("afterend", obj.scrollBar);//添加滚动条
        obj.scrollBarIndex = document.createElement('div');
        obj.scrollBar.appendChild(obj.scrollBarIndex);
        obj.scrollBar.style.position = 'absolute';
        obj.scrollBarIndex.style.position = 'absolute';
        obj.scrollBar.className = className || 'divScrollBar';
        if (!className) {
            obj.scrollBar.style.backgroundColor = '#ddd';
            obj.scrollBarIndex.style.backgroundColor = '#aaa';
        }

        that.scrollDivList.push(obj);
        that.scrollResetSize(obj);

        //使用鼠标滚轮滚动
        obj.scrollBar.scrollDiv = obj;
        obj.scrollBarIndex.scrollDiv = obj;


        if (typeof obj.onmousewheel == "object") {
            obj.onmousewheel = function () { that.scrollMove(event, that) };
            obj.scrollBar.onmousewheel = function () { that.scrollMove(event, that) };
            obj.scrollBarIndex.onmousewheel = function () { that.scrollMove(event, that) };
        } else if (typeof obj.onmousewheel == "undefined") {
            obj.addEventListener("DOMMouseScroll", function () { that.scrollMove(event, that) }, false);
            obj.scrollBar.addEventListener("DOMMouseScroll", function () { that.scrollMove(event, that) }, false);
            obj.scrollBarIndex.addEventListener("DOMMouseScroll", function () { that.scrollMove(event, that) }, false);
        }


        //拖动滚动条滚动
        obj.scrollBarIndex.onmousedown = function (evt:any) {
            evt = evt || event;
            that.scrollPageY = evt.clientY;
            that.scrollY = this.scrollDiv.scrollTop;
            // isScrollMove = true;
            // obj.onselectstart = function () { return false };
            that.scrollMoveObj = this.scrollDiv;
            if (this.scrollDiv.scrollBar.className == '') {
                this.scrollDiv.scrollBarIndex.style.backgroundColor = '#888';
            }
            return false;
        }


        let documentMove: any = document.documentElement.onmousemove;
        document.documentElement.onmousemove = function () {
            documentMove && documentMove();
            if (!that.scrollMoveObj) return;
            let evt: any = arguments[0] || event;
            var per = (that.scrollMoveObj.scrollHeight - that.scrollMoveObj.clientHeight) / (that.scrollMoveObj.clientHeight - that.scrollMoveObj.scrollBarHeight)
            that.scrollMoveObj.scrollTop = that.scrollY - (that.scrollPageY - evt.clientY) * per;
            that.setScrollPosition(that.scrollMoveObj);
        }

        let documentUp: any = document.documentElement.onmouseup;
        document.documentElement.onmouseup = function () {
            documentUp && documentUp();
            if (!that.scrollMoveObj) return;
            if (that.scrollMoveObj.scrollBar.className == '') {
                that.scrollMoveObj.scrollBarIndex.style.backgroundColor = '#aaa';
            }
            that.scrollMoveObj = null;
            // that._obj.onselectstart = function () { return true };
            return false;
        }


        callback && callback();



        that.pollUpdateScroll();

    }

    pollUpdateScroll() {
        let that = this;

      

        if (!that.obj) { return; }
        var scrollDom = document.getElementById(that.obj);
        if (scrollDom == null) return;

        setTimeout(() => {
            that.pollUpdateScroll.call(that);
        }, 500);

        if (that.thatDomHtmlCache === scrollDom.innerHTML) return;

       

        that.thatDomHtmlCache = scrollDom.innerHTML;
        that.onsize.call(that);

       

    }

    scrollResetSize(o:any) {
        if (o.scrollHeight <= o.clientHeight) {
            o.scrollTop = 0;
            o.scrollBar.style.display = 'none';
        } else {
            o.scrollBar.style.display = 'block';
        }
        var x = 0, y = 0;
        var p = o;
        while (p) {
            x += p.offsetLeft;
            y += p.offsetTop;
            p = p.offsetParent;
        }
        var borderTop = parseInt(o.style.borderTopWidth || 0);
        var borderBottom = parseInt(o.style.borderBottomWidth || 0);
        o.scrollBar.style.width = o.scrollBarWidth + 'px';
        o.scrollBar.style.height = o.clientHeight + 'px';
        //o.scrollBar.style.top = y + borderTop + 'px';
        //o.scrollBar.style.left = x + o.offsetWidth - o.scrollBarWidth + 'px';
        o.scrollBar.style.top = 0;
        o.scrollBar.style.right = 0;
        o.scrollBarIndex.style.width = o.scrollBarWidth + 'px';
        var h = o.clientHeight - (o.scrollHeight - o.clientHeight);
        //当滚动条滑块最小20个像素
        if (h < 20) {
            h = 20;
        }
        o.scrollBarHeight = h;
        o.scrollBarIndex.style.height = h + 'px';
        o.scrollBarIndex.style.left = '0px';
        this.setScrollPosition(o);
    }


    setScrollPosition(o:any) {
        try {
            o.scrollBarIndex.style.top = (o.clientHeight - o.scrollBarHeight) * o.scrollTop / (o.scrollHeight - o.clientHeight) + 'px';
        }
        catch (e) {
            o.scrollBarIndex.style.top = 0;
        }
    }

    scrollMove(evt:any, _that:any) {
        let ev = evt || event;
        let that = ev.target || ev.srcElement;
        let dom = document.getElementById(this.obj);
        if(eventsPath(that).indexOf(dom)) that = dom;

        

        //let that = ev.target || ev.srcElement;
        var div = that.scrollDiv || that;
        if (div.scrollHeight <= div.clientHeight) return true;
        //是否阻止滚轮默认的滚动事件
        if (!_that.fatherScroll) {
            try { ev.preventDefault(); } catch (e) { }
        }

        // console.log(ev.pageX+":"+ev.pageY);
        var step = 20;
        if (ev.wheelDelta < 0 || ev.detail > 0) {  //下
            if (div.scrollTop >= (div.scrollHeight - div.clientHeight)) return true;
            div.scrollTop += step;
        } else {//上
            if (div.scrollTop == 0) return true;
            div.scrollTop -= step;
        }
        _that.setScrollPosition(div);
        if (ev.stopPropagation) {//这是取消冒泡
            ev.stopPropagation();
        } else {
            ev.cancelBubble = true;
            window.event.cancelBubble = true; 
        };
        return false;
    }


    onsize() {
        var that = this;
        try {
            if (that.obj) {
                var scrollDom = document.getElementById(that.obj);
                that.scrollResetSize(scrollDom);
            } else {
                for (var i = 0; i < that.scrollDivList.length; i++) {
                    that.scrollResetSize(that.scrollDivList[i]);
                }
            }
        }
        catch (e) {

        }
    }
}



