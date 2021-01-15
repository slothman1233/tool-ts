import { moblieType, IosEdition } from "./moblieinit"
import window from "../window"
import Consts from "./const"

declare const nativeMethod: any;
declare const ImagePagerStringPath: any;




var androidFn: any = function (config: any) {
    nativeMethod.ImagePagerStringPath(config);
}; //安卓手机执行方法
var IosMethod_7: any = function (config: any) {
    ImagePagerStringPath(config);
}; //Ios 系统 7（包括7）一下的执行方法
var IosMethod: any = function (config: any) {
    window.webkit.messageHandlers.ImagePagerStringPath.postMessage(config);
}; //Ios  7以上的执行方法


//根据手机类型执行不同的方法
function booksInit(type: any, config: any) {
    var moblieTypes = moblieType(); //判断手机类型
    switch (moblieTypes) {
        case Consts._browseType.Android:
            androidMethod(type, config);
            break;
        case Consts._browseType.Ios:
            iosMethod(type, config);
            break;
        default:
            console.log(moblieTypes);
    }
}

//安卓的执行方法
function androidMethod(type: any, config: any) {
    androidFn(type, config);
}

//IOS的执行方法
function iosMethod(type: any, config: any) {
    var EditionType = IosEdition();
    if (EditionType[0] <= 7) {

        IosMethod_7(type, config);
    } else {
        IosMethod(type, config);
    }
}


/* 调用方法
         * booksInit(type,{参数名:参数值,参数名2:参数值2,...参数名n:参数值n})
         * 有两个参数
         * type 方法类型名
         * obj  参数列表
         */
export function index(type: string, config: any) {
    try {
        if (type) {
            if (config) {
                config = typeof config === "string" ? config : JSON.stringify(config);
                androidFn = function (type: string, config: any) {
                    eval("nativeMethod." + type + "('" + config + "')");
                };
                IosMethod_7 = function (type: string, config: any) {
                    eval(type + "('" + config + "')");
                };
                IosMethod = function (type: string, config: any) {
                    eval("window.webkit.messageHandlers." + type + ".postMessage('" + config + "')");
                };
            } else {
                androidFn = function (type: string, config: any) {
                    eval("nativeMethod." + type + "()");
                };
                IosMethod_7 = function (type: string, config: any) {
                    eval(type + "('none')");
                };
                IosMethod = function (type: string, config: any) {
                    eval("window.webkit.messageHandlers." + type + ".postMessage('none')");
                };
            }
        } else {
            alert("必须传入类型");
            return false;
        }
        booksInit(type, config);
    } catch (e) { }
}