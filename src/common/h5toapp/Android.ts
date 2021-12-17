
declare const nativeMethod: any;
const u = navigator.userAgent;
let androidFn = function (ImgAry: any, i?: any) {//安卓手机执行方法
    nativeMethod.ImagePagerStringPath({ "ImgAry": ImgAry, "i": i });
};
//安卓版本
export const moblieAndroidEdition = function () {
    //var aaa = "Mozilla/5.0(Linux;Android 6111111.444440.14141;)";
    var reg = /Android ([^.]*).([^.]*).([^;]*);/gi;
    var Tp: any[] = [];
    (<any>u.replace)(reg, function (a: any, b: any, c: any, e: any) {
        Tp[0] = b;
        Tp[1] = c;
        Tp[2] = e;
    });
    return Tp;
}

function method(config: any) {
    androidFn(config);
}

//出口方法
//config   
//id  图片的父级id
//MethodName   安卓 Ios 执行的方法名称
export const addMethod = function (config: any) {
    if (config.MethodName) {
        androidFn = function (config) {
            eval("nativeMethod." + config.MethodName + "(" + config + ")");
        };
    }
    method(config);
}