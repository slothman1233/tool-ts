


import * as compatible from "./common/compatible"
import * as browser from "./common/browser"
import * as computedStyle from "./common/computed-style"
import * as dom from "./common/dom"
import * as obj from "./common/obj"
import * as https from "./common/httprequest"
import * as subscrible from "./common/subscrible"
import * as log from "./common/log"
import * as event from "./common/event"
import * as jsScroll from "./common/jsScroll"
import * as requestNextAnimationFrame from "./common/requestNextAnimationFrame"
import * as ajaxfileupdate from './common/ajaxfileupdate';
import * as select from './common/select'
import * as dragsort from "./common/dragsort";
import * as linedragsort from "./common/linedragsort";
import * as slidePic from "./common/slidePic"
import * as primes from "./common/priomes"
import * as imageMagnification from "./common/image-magnification"
import * as contextmenu from "./common/contextmenu"
import * as kkpager from "./common/kkpager"
import * as proportion from "./common/proportion"
import fxLanguage from "./languages/cn"
import "./common/es6"
export default class fxClass {
    language: object;
    constructor(language: langStatic) {
        this.language = language;
        [
            (<any>compatible),
            (<any>browser),
            (<any>computedStyle),
            (<any>dom),
            (<any>obj),
            (<any>https),
            (<any>subscrible),
            (<any>log),
            (<any>requestNextAnimationFrame),
            (<any>event),
            (<any>jsScroll),
            (<any>ajaxfileupdate),
            (<any>select),
            (<any>slidePic),
            (<any>dragsort),
            (<any>linedragsort),
            (<any>primes),
            (<any>imageMagnification),
            (<any>kkpager),
            (<any>contextmenu),
            (<any>proportion)

        ].forEach(k => {
            for (let i in k) {
                if ((<any>fxClass).prototype[i]) { new Error(`${fxLanguage.index.error}${i}`); }
                (<any>fxClass).prototype[i] = (<any>k[i]);
            }

        })
    }
}


export {
    compatible,
    browser,
    computedStyle,
    dom,
    obj,
    https,
    subscrible,
    log,
    requestNextAnimationFrame,
    event,
    jsScroll,
    ajaxfileupdate,
    select,
    slidePic,
    dragsort,
    linedragsort,
    primes,
    imageMagnification,
    kkpager,
    contextmenu,
    proportion
};


// export default function (language: langStatic) {
//     let instance;
//     instance = new fxClass(language);
//     return instance
// }


