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
export declare let SelectMethod: (dom: any, datas: any) => void;
