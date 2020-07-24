
import { mergeOptions } from "./compatible"
import { log } from "./log"
import { each } from './obj';

declare var Function: any;

const https = {
    /**
       * js封装ajax请求
       * >>使用new XMLHttpRequest 创建请求对象,所以不考虑低端IE浏览器(IE6及以下不支持XMLHttpRequest)
       * >>使用es6语法,如果需要在正式环境使用,则可以用babel转换为es5语法 https://babeljs.cn/docs/setup/#installation
       *  @param settings 请求参数模仿jQuery ajax
       *  调用该方法,data参数需要和请求头Content-Type对应
       *  Content-Type                        data                                     描述
       *  application/x-www-form-urlencoded   'name=哈哈&age=12'或{name:'哈哈',age:12}  查询字符串,用&分割
       *  application/json                     name=哈哈&age=12'                        json字符串
       *  multipart/form-data                  new FormData()                           FormData对象,当为FormData类型,不要手动设置Content-Type
       *  注意:请求参数如果包含日期类型.是否能请求成功需要后台接口配合
       */


    ajax: (settings = {}) => {
        let _s: any;
        _s = mergeOptions({
            url: "", //请求地址
            type: "GET", //请求类型 GET POST DELETE
            dataType: "json",//返回的数据类型 json text document ...
            async: true, //true:异步请求 false:同步请求
            data: null,//请求的参数
            headers: {},//请求头
            timeout: 10000,//请求超时时间
            isFromdata: false,
            beforeSend: (xhr:any) => { },
            success: (result:any, status:any, xhr:any) => { },
            error: (xhr:any, status:any, error:any) => { },
            complete: (xhr:any, status:any) => { }
        }, settings);

        //验证参数
        if (!_s.url || !_s.type || !_s.data || !_s.dataType) {
            log(fxLanguage.httprequest.parameterError);
            return;
        }

        //创建请求
        let xhr = new XMLHttpRequest();
        //请求开始回调函数
        xhr.addEventListener('loadstart', e => {
            _s.beforeSend(xhr);
        })

        //请求成功
        xhr.addEventListener("load", e => {
            const status = xhr.status;
            if ((status >= 200 && status <= 300) || status === 304) {
                let result;
                if (xhr.responseType === "text") {
                    result = xhr.responseText
                } else if (xhr.responseType === "document") {
                    result = xhr.responseXML;
                } else {


                    if (xhr.response) {
                        result = "";
                        try {
                            result = Object.prototype.toString.call(xhr.response) === "[object String]" ? JSON.parse(xhr.response) : xhr.response;
                        } catch (e) {
                            result = xhr.response;
                        }
                    } else {
                        result = "";
                        try {
                            result = Object.prototype.toString.call(xhr.responseText) === "[object String]" ? JSON.parse(xhr.responseText) : xhr.responseText;
                        } catch (e) {
                            result = xhr.responseText;
                        }
                    }
                }
                _s.success(result, status, xhr);
            } else {
                _s.error(xhr, status, e);
            }
        })

        //请求结束
        xhr.addEventListener("loadend", e => {
            _s.complete(xhr, xhr.status);
        })

        //请求错误
        xhr.addEventListener("error", e => {
            _s.error(xhr, xhr.status, e)
        })

        //请求超时
        xhr.addEventListener("timeout", e => {
            _s.error(xhr, 408, e)
        });

        let useUrlParam = false;
        let sType = _s.type.toUpperCase();
        //如果是简单的请求，则把data参数组装在URL上
        if (sType === "GET" || sType === "DELETE") {
            useUrlParam = true;
            _s.url += https.getUrlParam(_s.url, _s.data);
        }

        //初始化请求
        try {
            xhr.open(_s.type, _s.url, _s.async);
        } catch (e) {
            _s.error(xhr, xhr.status, e);
            return;
        }


        //设置返回类型
        xhr.responseType = _s.dataType;

        //设置请求头
        if (_s.headers) {
            for (const key of Object.keys(_s.headers)) {
                xhr.setRequestHeader(key, _s.headers[key]);
            }
        }


        //设置超时时间
        if (_s.async && _s.timeout) {
            xhr.timeout = _s.timeout;
        }

        //发送请求.如果是简单请求,请求参数应为null.否则,请求参数类型需要和请求头Content-Type对应

        let sendData;
        if (_s.isFromdata) {
            sendData = _s.data;
        } else {
            if (useUrlParam) {
                sendData = null;
            } else if (_s.headers["Content-Type"] && _s.headers["Content-Type"].indexOf("application/json") >= 0) {
                sendData = JSON.stringify(_s.data)
            } else {
                sendData = https.getQueryString(_s.data)
            }
        }




        xhr.send(sendData);
    },


    getUrlParam: (url:string, data:any) => {
        if (!data) {
            return "";
        }

        let paramStr = data instanceof Object ? https.getQueryString(data) : data;
        return (url.indexOf("?") !== -1) ? paramStr : "?" + paramStr;
    },

    // 把对象转为查询字符串
    getQueryString: (data:any) => {
        let parasArr:Array<any> = [];
        if (data instanceof Object) {
            each(data, (value:any, key:any) => {
                let val = value;
                // todo 参数Date类型需要根据后台api酌情处理
                if (val instanceof Date) {
                    // val = dateFormat(val, 'yyyy-MM-dd hh:mm:ss');
                }
                parasArr.push(encodeURIComponent(key) + '=' + encodeURIComponent(val))
            })
        }
        return parasArr.join("&");
    },

    /**
     * 根据实际业务情况装饰 ajax 方法
     * 如:统一异常处理,添加http请求头,请求展示loading等
     * @param settings
     */
    request: (settings: any = {}) => {
        //统一异常处理
        let errorHandle = (xhr:any, status:any) => {
            if (status === 401) {
                log(fxLanguage.httprequest.noAuthority);
            } else if (status === 408) {
                log(fxLanguage.httprequest.timeOut);
            }
        }

        // 使用before拦截参数的 beforeSend 回调函数
        settings.beforeSend = (settings.beforeSend || function () {

        })
            .before((xhr:any) => {
                log("request show loading...")
            })
        // 保存参数success回调函数
        let successFn = settings.success;
        // 覆盖参数success回调函数
        settings.success = (result:any, status:any, xhr:any) => {
            // todo 根据后台api判断是否请求成功
            if (result && result instanceof Object && result.code !== 1) {
                errorHandle(xhr, status);
            } else {
                log("request success");
                successFn && successFn(result, status, xhr);
            }
        }

        // 拦截参数的 error
        settings.error = (settings.error || function () {

        })
            .before((result:any, status:any, xhr:any) => {
                errorHandle(xhr, status);
            })

        // 拦截参数的 complete
        settings.complete = (settings.complete || function () {
        }).after((xhr:any, status:any) => {
            log('request hide loading...');
        });

        // 请求添加权限头,然后调用http.ajax方法
        ((<any>https.ajax).before(https.addAuthorizationHeader))(settings);
    },

    // 添加权限请求头
    addAuthorizationHeader: (settings:any) => {
        settings.headers = settings.headers || {};
        const headerKey = 'Authorization'; // todo 权限头名称
        // 判断是否已经存在权限header
        let hasAuthorization = Object.keys(settings.headers).some(key => {
            return key === headerKey;
        });
        if (!hasAuthorization) {
            settings.headers[headerKey] = 'test'; // todo 从缓存中获取headerKey的值
        }
    }



}

Function.prototype.before = (beforeFn:any) => {
    let _self = this;
    return (...arg:Array<any>) => {
        beforeFn.apply(this, arg);
        _self.apply(this, arg);
    }
}

Function.prototype.after = (afterFn:any) => {
    let _self = this;
    return (...arg:Array<any>) => {
        _self.apply(this, arg);
        afterFn.apply(this, arg);
    }
}

class dataModel {
    url: string
    type: string
    dataType: string = 'json'
    data: object = {}
    isFromdata: boolean
    headers: object = {}
    success: any = function () { }
    beforeSend: any = function () { }
    complete: any = function () { }
    error: any = function () { }
    constructor(data: any) {
        this.headers = data.headers;
        this.type = data.type
        this.isFromdata = data.isFromdata || false;
    }
}

export const http = {
    get: (data: any) => {
        let d = mergeOptions(new dataModel({ headers: {}, type: 'GET' }), data)
        https.ajax(d);
    },
    delete: (data: any) => {
        let d = mergeOptions(new dataModel({ headers: {}, type: 'DELETE' }), data)
        https.ajax(d);
    },
    // 调用此方法,参数data应为查询字符串或普通对象
    post: (data: any) => {
        let d = mergeOptions(new dataModel({ headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }, type: 'POST' }), data)
        https.ajax(d);
    },

    put: (data: any) => {
        let d = mergeOptions(new dataModel({ headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8','X-HTTP-Method-Override':'put' }, type: 'POST' }), data)
        https.ajax(d);
    },
    // 调用此方法,参数data应为json字符串
    postbody: (data: any) => {
        let d = mergeOptions(new dataModel({ headers: { 'Content-Type': 'application/json; charset=UTF-8' }, type: 'POST' }), data)
        https.ajax(d);
    },
    fromData: (data: any) => {
        let d = mergeOptions(new dataModel({ headers: {}, type: 'POST', isFromdata: true }), data)
        https.ajax(d);
    },

}


