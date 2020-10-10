
import { mergeOptions } from "./compatible";
import { jsScroll } from "./jsScroll"
import { find, siblings, hide, show, removeClass, addClass } from "./dom";
import { isString } from "./obj";
import { eventsPath } from "./event";
import fxLanguage from "../languages/cn"

/**
 * 自定义下拉列表继承了自制滚动条
 * @param {Element} dom 父盒子
 * @param {object} datas fx.SelectMethod(document.getElementById("Mechanism"), { height: 150, id: 1, scroll: { w: 10, c: '' }, callback: function () { }, optionCallback: function (text, id) { console.log(text + '_' + id); }, bodyMassage:[{"Id": "0", "Name": "许可机构" },{"Id": "0", "Name": "许可机构" }]});
            * @param {object} bodyMassage 列表数据
                    * @param {string | number} id：唯一标示（展示默认为0）
                    * @param {string} name 名称
            * @param {number} height 下拉列表的最大高度
            * @param {string | number} d   为-100的情况下默认内容的提示
            * @param {string} Selected 下拉列表选中子集的样式 默认:selected
            * @param {string} prompt 提示语（当d = -100的情况下默认内容的提示语）
            * @param {Function} callback 加载完成后的回调方法
            * @param {Function} optionCallback(text,id) 点击选择子菜单的选项后触发,text:内容,id：当前选项的id
            * @param {object} scroll 滚动条的属性
                    * @param {number} w 滚动条的宽度 默认10
                    * @param {string} c 滚动条的样式 默认divScrollBar
                    * @param {boolean} fatherScroll 是否需要滚动父级的滚动条 默认为false
                    *                               当前窗口滚动条到底部后，继续滚动滑轮是否继续滚动条父级的滚动条
 */
export let SelectMethod = function (dom: any, datas: any) {
    if (!dom) return;
    var Bar = 'divScrollBar';
    var d = {
        d: 0,
        height: 150,
        Fid: dom.id,
        Selected: 'selected',
        callback: function () { },
        optionCallback: function () { },
        scroll: { w: 10, c: Bar, fatherScroll: false },
        prompt: fxLanguage.select.prompt
    };

    addClass(dom, "fx_select_addclass");

    var isExistenceId = false; // 是否存在默认展示的id
    var data: any = mergeOptions(d, datas);
    data.scroll.c = data.scroll.c == "" ? Bar : data.scroll.c;

    var bodyMassage = isString(data.bodyMassage) ? JSON.parse(data.bodyMassage) : data.bodyMassage;
    if (bodyMassage instanceof Array) {
        bodyMassage = bodyMassage;
    }
    else {
        bodyMassage = JSON.parse("[" + JSON.stringify(bodyMassage) + "]");
    }
    var t: any = dom;
    var scrollDom: any = null;
    html(bodyMassage, t);



    function html(bodyMassage: any, t: any) {
        var optionHtml = "";

        function Init() {
            var titleDate;
            for (var i = 0; i < bodyMassage.length; i++) {
                if (bodyMassage[i].Id == data.d) {
                    isExistenceId = true;
                    titleDate = bodyMassage[i];
                    optionHtml += option(bodyMassage[i], true);

                } else {
                    optionHtml += option(bodyMassage[i]);
                }

            }
            if (!isExistenceId) {
                titleDate = bodyMassage[0];
            }
            t.innerHTML = selectHtml(optionHtml, titleDate, data);
            AddMethod(data, t);
        }

        function option(d: any, bol?: any) {
            var c = bol ? data.Selected : '';
            return "<p data-id=" + d.Id + " class='" + c + "'>" + d.Name + "</p>";
        }

        function selectHtml(html:string, titleDate:any, data:any) {
            var titleDatethis: any = {};
            if (data.d == '-100') {
                titleDatethis.Id = -100;
                titleDatethis.Name = data.prompt;
            } else {
                titleDatethis = titleDate;
            }
            var htmls = '<div class="select_m select_am">'
                + '<h2 data-id="' + titleDatethis.Id + '"><span>' + titleDatethis.Name + '</span><i></i></h2>'
                + '<div style="position: relative;display:none;" class="optionf"><div class="option" id="' + data.Fid + '_option" style="overflow:hidden; max-height:' + data.height + 'px;">'
                + html
                + ' </div></div></div>';

            return htmls;
        }




        Init();
    }

    function AddMethod(data: any, t: any) {
        var option:any, c:any, isScrollBtn = false;
        find(t, ".select_m")[0].firstElementChild.onclick = function (e: any) {

            var that = this;

            option = that.nextElementSibling;
            var isshow = false;
            if (option.style.display === "none") {
                isshow = false;
            }
            else {
                isshow = true;
            }

            hide(option);
            if (!isshow) {
                show(option);
            }

            if (scrollDom) scrollDom.onsize();
            if (jsScroll && find(option, '.' + data.scroll.c).length <= 0 && option.style.display !== "none") {
                option.style.paddingRight = data.scroll.w;
                scrollDom = new jsScroll(find(option, '.option')[0].id, data.scroll.w, data.scroll.c, data.scroll.fatherScroll, function () {
                    let dom = find(option, '.' + data.scroll.c)[0];
                    if (!dom) return;
                    dom.onmousedown = function () {
                        isScrollBtn = true;
                    }


                });
            }
            return false;
        }



        find(t, ".option")[0].onmouseup = function (e: any) {
            if (isScrollBtn) { isScrollBtn = false; return }
            let ev = e || event;
            var target = ev.target || ev.srcElement;
            find(t, ".select_m")[0].firstElementChild.firstElementChild.innerHTML = target.innerHTML;
            find(t, ".select_m")[0].firstElementChild.setAttribute("data-id", target.getAttribute("data-id"));
            hide(find(t, ".optionf")[0]);
            siblings(target, function (ele: any) {
                removeClass(ele, data.Selected);
            })

            addClass(target, data.Selected);
            if (data.optionCallback) data.optionCallback(target.innerText, target.getAttribute("data-id"));
        }


        document.onmouseup = function (e: any) {
            if (isScrollBtn) { isScrollBtn = false; return }
            let ev: any = e || event;
            var target = ev.target || ev.srcElement;

            let classArr = document.querySelectorAll('.fx_select_addclass');
            for (let i = 0; i < classArr.length; i++) {

                let arr = classArr[i].children;

                let iss = false;
                for (let i = 0; i < arr.length; i++) {
                    let eventpath = eventsPath(ev);
                    if (eventpath.indexOf(arr[i]) >= 0) {
                        iss = true;
                    }

                }
                if (!iss) hide(find(classArr[i], ".optionf")[0]);
            }
        }



    }



}


