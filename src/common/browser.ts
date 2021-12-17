
import { IS_PC } from "./browser/IS_PC";
import { IS_IPHONE } from "./browser/IS_IPHONE";
import { IS_IPAD } from "./browser/IS_IPAD";
import { IS_IPOD } from "./browser/IS_IPOD";
import { IS_IOS } from "./browser/IS_IOS";
import { IOS_VERSION } from "./browser/IOS_VERSION";
import { IS_ANDROID } from "./browser/IS_ANDROID";
import { ANDROID_VERSION } from "./browser/ANDROID_VERSION";
import { IS_NATIVE_ANDROID } from "./browser/IS_NATIVE_ANDROID";
import { IS_FIREFOX } from "./browser/IS_FIREFOX";
import { IE_VERSION } from "./browser/IE_VERSION";
import { IS_EDGE } from "./browser/IS_EDGE";
import { IS_CHROME } from "./browser/IS_CHROME";
import { CHROME_VERSION } from './browser/CHROME_VERSION';
import { IS_IOS_SAFARI } from './browser/IS_IOS_SAFARI';
import { IS_SAFARI } from "./browser/IS_SAFARI";
import fxLanguage from "./../languages/cn";
export default class fxClass {
    constructor() {
        [
            (<any>IS_PC),
            (<any>IS_IPHONE),
            (<any>IS_IPAD),
            (<any>IS_IPOD),
            (<any>IS_IOS),
            (<any>IOS_VERSION),
            (<any>IS_ANDROID),
            (<any>ANDROID_VERSION),
            (<any>IS_NATIVE_ANDROID),
            (<any>IS_FIREFOX),
            (<any>IE_VERSION),
            (<any>IS_EDGE),
            (<any>IS_CHROME),
            (<any>CHROME_VERSION),
            (<any>IS_IOS_SAFARI),
            (<any>IS_SAFARI)

        ].forEach(k => {
            for (let i in k) {
                if ((<any>fxClass).prototype[i]) { new Error(`${fxLanguage.index.error}${i}`); }
                (<any>fxClass).prototype[i] = (<any>k[i]);
            }

        })
    }
}


export {
  IS_PC,
  IS_IPHONE,
  IS_IPAD,
  IS_IPOD,
  IS_IOS,
  IOS_VERSION,
  IS_ANDROID,
  ANDROID_VERSION,
  IS_NATIVE_ANDROID,
  IS_FIREFOX,
  IE_VERSION,
  IS_EDGE,
  IS_CHROME,
  CHROME_VERSION,
  IS_IOS_SAFARI,
  IS_SAFARI
};