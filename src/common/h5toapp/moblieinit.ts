import Consts from "./const"
import { IosType, molieIosEdition } from "./Ios"
import { moblieAndroidEdition, addMethod } from "./Android"
const u = navigator.userAgent;

//判断苹果手机的种类  iPhone   ipend
export const IosTypes = IosType

//获取Ios的版本    
//返回的是数组   (8_0_1)  [8][0][1]
export const IosEdition = molieIosEdition

//获取安卓的版本
//返回的是数组   (8.0.1)  [8][0][1]
export const AndroidEdtition = moblieAndroidEdition

//判断手机是哪种类型
export const moblieType = function (): number {
    if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
        return Consts._browseType.Android;
    } else if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        return Consts._browseType.Ios;
    }
    return 0;
}


//根据不用手机执行不同的方法
export const moblieTypeFn = function (Fn: any) {
    if (typeof Fn === 'function') {
        switch (moblieType()) {
            case Consts._browseType.Android:
                Fn();
                break;
            case Consts._browseType.Ios:
                Fn();
                break;
            default:
                break;
        }
    } else {
        console.log("参数必须为方法");
    }
}

//手机获取版本的方法
//返回的是数组   (8_0_1)  [8][0][1]
export const moblieEdition = function () {
    switch (moblieType()) {
        case Consts._browseType.Android:
            return moblieAndroidEdition();
            break;
        case Consts._browseType.Ios:
            return molieIosEdition();
            break;
        default:
            return null;
            break;
    }
}

//添加方法
//config 参数 对象形式
// {MethodName:方法名称}
//ImagePagerStringPath  默认方法名
export const addMethods = function (config: any) {
    switch (moblieType()) {
        case Consts._browseType.Android:
            return addMethod(config);
            break;
        case Consts._browseType.Ios:
            return addMethod(config);
            break;
        default:
            return null;
            break;
    }
}

//微信内核执行方法
export const wechatMethod = function (fn: any) {
    var isWechat = !!/MicroMessenger/i.test(u);
    if (isWechat) {
        return true;
    } else {
        return false;
    }
}