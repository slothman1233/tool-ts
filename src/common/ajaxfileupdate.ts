import { extend } from "./compatible"
import { log } from "util";
import { createEl, remove } from './dom';
import { proportion } from "./proportion";

/*
     document.getElementById('upload-file').onchange = function () {
            fx.updateFile({
                url: "/UploadFile/Post", //用于文件上传的服务器端请求地址
                type: "post",
                data: { FileElementId: "upload-file", FileType: 1, Uid: 123 }, //此参数非常严谨，写错一个引号都不行
                secureuri: false, //一般设置为false
                fileElementId: "upload-file", //文件上传空间的id属性  <input type="file" id="file" name="file" />
                dataType: "dataType", //返回值类型 一般设置为json
                success: function (d) {
                    console.log(d);
                },
                error: function (data, status, e) {
                }
            })
        }
*/

let ajaxfileupdate = {
    //错误类型
    errorEnum: {
        size: { type: 0 }, //大小超出
        fileType: { type: 1 },  //类型错误
        timeout: { type: 2 }, //超时
        error: { type: 3 } //程序报错
    },

    Cache: {},

    /**
     * 错误的会调用
     * @param  {object } s 上传的参数 
     * @param { object } type 错误类型
     * @param { any } e 程序错误的说明
     */
    handleError: function (s: any, type: any, e?: any, fileData?: any) {
        // If a local callback was specified, fire it  
        if (s.error) {
            s.error.call(s.context || s, type, e, fileData);
        }
    },

    //创建 iframe
    createUploadIframe: function (id: any) {

        var frameId = 'jUploadFrame' + id;

        let is = <HTMLElement>createEl("iframe", {
            id: frameId,
        }, {
            name: frameId
        })
        is.style.display = "none";

        document.body.appendChild(is);

        return is;
    },

    //创建form的表单
    createUploadForm: function (id: any, url: any, fileElementId: any, data: any) {
        //create form     
        var formId = 'jUploadForm' + id;
        var fileId = 'jUploadFile' + id;

        let form = <HTMLElement>createEl("form", {}, {
            action: url,
            method: "POST",
            name: formId,
            id: formId,
            enctype: "multipart/form-data"
        })

        // var form = jQuery('<form  action="' + url + '" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data"></form>');
        if (data) {
            for (var i in data) {
                let it = createEl("input", {}, {
                    type: "hidden",
                    name: i,
                    value: data[i]
                })
                form.appendChild(it);

                // jQuery('<input type="hidden" name="' + i + '" value="' + data[i] + '" />').appendTo(form);
            }
        }

        var oldElement = document.getElementById(fileElementId)
        var newElement: any = oldElement.cloneNode();
        newElement.onchange = oldElement.onchange;

        oldElement.id = fileId;
        oldElement.insertAdjacentElement("beforebegin", newElement);
        form.appendChild(oldElement);
        form.style.position = "absolute";
        form.style.top = "-1200px";
        form.style.left = "-1200px";
        document.body.appendChild(form);

        return form;
    },

    //判断文件的格式是否正确
    filetype: function (s: any) {

        let FileTypeDefine = {
            1: ["jpg", "png", "gif", "jpeg", "bmp", "ico"], //图片
            2: ["wav", "mp3", "wma", "amr", "m4a"], //音频
            3: ["mp4", "flv", "f4v", "webm", "m4v", "mov", "3gp", "3g2", "rm", "rmvb", "wmv", "avi", "asf", "mpg", "mpeg", "mpe", "ts", "div", "dv", "divx", "vob", "dat", "mkv"] //视频
        }
        var flid = (<HTMLInputElement>document.getElementById(s.fileElementId)).value.toLocaleLowerCase();
        if (s.FileTypeArray && s.FileTypeArray.length > 0) {
            if (s.FileTypeArray.indexOf(flid.substr(flid.lastIndexOf(".") + 1)) < 0) {
                return false;
            }
        } else {
            if ((<any>FileTypeDefine)[s.data.FileType].indexOf(flid.substr(flid.lastIndexOf(".") + 1)) < 0) {
                return false;
            }
        }


        return true;
    },

    //判断文件的大小
    fileSize: function (s: any) {
        try {
            let file = (<any>document.getElementById(s.fileElementId)).files[0];
            let size = s.filesize || 1024 * 1024 * 50;
            if (file && file.size > size) {
                return false;
            }
            return true;
        } catch (e) {
            return true;
        }


    },

    //入口文件
    ajaxFileUpload: function (datas: ajaxfileupdateModel) {
        let s = extend(ajaxfileupdate.data, datas);

        s.beforeSend && s.beforeSend();

        if (!ajaxfileupdate.filetype(s)) {
            ajaxfileupdate.handleError(s, (<any>ajaxfileupdate).errorEnum.fileType, "类型错误", (<any>ajaxfileupdate).Cache[id]);
            s.complete && s.complete();
            return;
        }

        if (!ajaxfileupdate.fileSize(s)) {
            ajaxfileupdate.handleError(s, (<any>ajaxfileupdate).errorEnum.size, "大小超出", (<any>ajaxfileupdate).Cache[id]);
            s.complete && s.complete();
            return;
        }

        var xml = { responseText: "", responseXML: "" };

        var id = new Date().getTime();
        var form = ajaxfileupdate.createUploadForm(id, s.url, s.fileElementId, (typeof (s.data) == 'undefined' ? false : s.data));
        var io = ajaxfileupdate.createUploadIframe(id);
        var frameId = 'jUploadFrame' + id;
        var formId = 'jUploadForm' + id;

        var requestDone = false;

        // Wait for a response to come back  
        var uploadCallback = function (isTimeout: any, type?: any) {
            var Ele: any = null, id: any = null;
            try {
                Ele = isTimeout.target || isTimeout.srcElement;
                id = Ele.id;
            } catch (e) {

            }


            var io = <any>document.getElementById(frameId);
            try {
                if (io.contentWindow) {
                    xml.responseText = io.contentWindow.document.body ? io.contentWindow.document.body.innerHTML : null;
                    xml.responseXML = io.contentWindow.document.XMLDocument ? io.contentWindow.document.XMLDocument : io.contentWindow.document;

                } else if (io.contentDocument) {
                    xml.responseText = io.contentDocument.document.body ? io.contentDocument.document.body.innerHTML : null;
                    xml.responseXML = io.contentDocument.document.XMLDocument ? io.contentDocument.document.XMLDocument : io.contentDocument.document;
                }
            } catch (e) {

                ajaxfileupdate.handleError(s, ajaxfileupdate.errorEnum.error, e, (<any>ajaxfileupdate).Cache[id]);
            }
            if (xml || type == "timeout") {
                requestDone = true;
                var status;
                try {
                    status = type != "timeout" ? "success" : "error";
                    // Make sure that the request was successful or notmodified  
                    if (status != "error") {
                        // process the data (runs the xml through httpData regardless of callback)  
                        var data = ajaxfileupdate.uploadHttpData(xml, s.dataType);
                        // If a local callback was specified, fire it and pass it the data  

                        s.success && s.success(data, status, (<any>ajaxfileupdate).Cache[id]);

                        s.complete && s.complete(data, status, (<any>ajaxfileupdate).Cache[id]);

                    } else
                        ajaxfileupdate.handleError(s, (<any>ajaxfileupdate).errorEnum.timeout, "请求超时", (<any>ajaxfileupdate).Cache[id]);
                } catch (e) {
                    status = "error";
                    ajaxfileupdate.handleError(s, (<any>ajaxfileupdate).errorEnum.error, e, (<any>ajaxfileupdate).Cache[id]);
                }

                //清空内容
                if ((<any>document.getElementById(s.fileElementId))) { (<any>document.getElementById(s.fileElementId)).value = ""; }

                setTimeout(function () {
                    try {
                        remove(io);
                        remove(form);
                        delete (<any>ajaxfileupdate).Cache[id]
                    } catch (e) {
                        ajaxfileupdate.handleError(s, xml, e, (<any>ajaxfileupdate).Cache[id]);
                    }

                }, 100);

                xml = null;

            }
        };


        // Timeout checker  
        if (s.timeout > 0) {
            (function (frameId) {

                setTimeout(function () {
                    // Check to see if the request is still happening  
                    if (!requestDone) uploadCallback({ target: { id: frameId } }, "timeout");
                }, s.timeout);
            })(frameId)

        }

        try {

            var form = document.getElementById(formId);

            form.setAttribute('action', s.url);
            form.setAttribute('method', "POST");
            form.setAttribute('target', frameId);

            if ((<any>form).encoding) {
                form.setAttribute('encoding', 'multipart/form-data');
            }
            else {
                form.setAttribute('enctype', 'multipart/form-data');
            }



            (<any>form).submit();

            (<any>ajaxfileupdate).Cache[frameId] = JSON.parse(JSON.stringify(s));

            document.getElementById(frameId).onload = uploadCallback;

        } catch (e) {

            ajaxfileupdate.handleError(s, (<any>ajaxfileupdate).errorEnum.error, e);
            s.complete && s.complete();
        }


        return { abort: function () { } };


    },



    data: {
        "type": "GET",
        "isLocal": false,
        "global": true,
        "processData": true,
        "async": true,
        "data": { FileType: 1 },
        "contentType": "application/x-www-form-urlencoded; charset=UTF-8",
        "accepts": { "*": "*/*", "text": "text/plain", "html": "text/html", "xml": "application/xml, text/xml", "json": "application/json, text/javascript", "script": "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" },
        "contents": { "xml": {}, "html": {}, "json": {}, "script": {} },
        "responseFields": { "xml": "responseXML", "text": "responseText" },
        "converters": { "text html": true },
        "flatOptions": { "url": true, "context": true },
        "jsonp": "callback"
    },

    uploadHttpData: function (r:any, type:any) {
        var data = !type;
        data = type == "xml" || data ? r.responseXML : r.responseText;
        return data;
    }
}



/**
 * 上传图片视频或者音频
 * fx.updateFile(data)
 * @param {ajaxfileupdateModel} data 上传需要的数据
 * data:{
 * @param {string} url:用于文件上传的服务器端请求地址
 * @param {string} type:请求类型 "get、post"
 * @param {number} filesize 文件的大小限制 默认 1024 * 1024 * 50
 * @param {object} data:
        * {
        * @param {string} FileElementId:input的id,
        * @param {number} FileType上传的类型  1 图片   2音频   3视频
        * @param {string} Uid 用户id
        * }
 * @param {string} dataType:返回的类型
 * @param {Function} beforeSend 请求执行前的回调
 * @param {Function} success(data) 成功后的回调
         *  @param {object} 服务器回传的数据
 * @param {Function} error(s,type,e)  失败后的回调
        * @param  {object } s 上传的参数 
        * @param { object } type 错误类型
        * @param { any } e 程序错误的说明 
 * @param {Function} complete  请求完成不管成功还是失败都会执行
  * }
 * @example
   document.getElementById('upload-file').onchange = function () {
            fx.updateFile({
                url: "/UploadFile/Post", //用于文件上传的服务器端请求地址
                type: "post",
                data: { FileElementId: "upload-file", FileType: 1, Uid: 123 }, //此参数非常严谨，写错一个引号都不行
                secureuri: false, //一般设置为false
                fileElementId: "upload-file", //文件上传空间的id属性  <input type="file" id="file" name="file" />
                dataType: "dataType", //返回值类型 一般设置为json
                FileTypeArray:[] //允许传的文件类型
                success: function (d) {
                    console.log(d);
                },
                error: function (data, status, e) {
                }
            })
        }

 */


export let updateFile = ajaxfileupdate.ajaxFileUpload;