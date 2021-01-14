import window from "../window"
declare const ImagePagerStringPath: any;
import Consts from "./const"

let u = navigator.userAgent;
let IosMethod_7 = function (config: any) {//Ios 系统 7（包括7）一下的执行方法
    ImagePagerStringPath(config);
};
let IosMethod = function (config: any) {//Ios  7以上的执行方法
    window.webkit.messageHandlers.ImagePagerStringPath.postMessage(config);
};

function method(config: any) {
    var EditionType = molieIosEdition();
    if (EditionType[0] <= 7) {

        IosMethod_7(config);
    } else {
        IosMethod(config);
    }
}

//判断苹果手机的种类
export const IosType = function () {
    if (u.match(/iPhone/i)) {
        return Consts._IosType.iPhone;
    } else if (u.match(/iPod/i)) {
        return Consts._IosType.iPod;
    } else if (u.match(/iPad/i)) {
        return Consts._IosType.iPad;
    } else {
        return null;
    }
}



//Ios版本
export const molieIosEdition = function () {
    // var aa = "Mozilla/5.0(iPhone;CPU iPhone OS 811_422_133 like MAC OS X)";
    var reg = /OS ([^_]*)_([^_]*)_([^_]*) like Mac OS X/gi;
    var Tp: any[] = [];
    (<any>u.replace)(reg, function (a: any, b: any, c: any, e: any) {
        Tp[0] = b;
        Tp[1] = c;
        Tp[2] = e;
    });
    return Tp;
}


//出口方法
//config   
//id  图片的父级id
//MethodName   安卓 Ios 执行的方法名称
export const addMethod = function (config: any) {
    var configs = JSON.stringify(config);
    if (config.MethodName) {
        IosMethod_7 = function (config) {
            eval(config.MethodName + "(" + configs + ")");
        };
        IosMethod = function (config) {
            eval("window.webkit.messageHandlers." + config.MethodName + ".postMessage(" + configs + ")");
        };
    }
    method(configs);
}