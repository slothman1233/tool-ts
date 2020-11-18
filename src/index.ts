///<reference path="./languages/language.d.ts" />
import * as compatible from "./common/compatible"
import * as browser from "./common/browser"
import * as computedStyle from "./common/computed-style"
import * as dom from "./common/dom"
import * as obj from "./common/obj"
import * as object from "./common/object"
import "./common/array"
import * as subscrible from "./common/subscrible"
import * as log from "./common/log"
import * as event from "./common/event"
import * as requestNextAnimationFrame from "./common/requestNextAnimationFrame"
import * as promise from "./common/promise"
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
            (<any>object),
            (<any>subscrible),
            (<any>log),
            (<any>requestNextAnimationFrame),
            (<any>event),
            (<any>promise),

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
    object,
    subscrible,
    log,
    requestNextAnimationFrame,
    event,
    promise,
};


// export default function (language: langStatic) {
//     let instance;
//     instance = new fxClass(language);
//     return instance
// }


