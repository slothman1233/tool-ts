
import { dom } from "./event/dom";
import { eleEqualStr } from "./event/eleEqualStr";
import { eventsPath } from "./event/eventsPath";
import { getTagName } from "./event/getTagName";
import { off } from "./event/off";
import { on } from "./event/on";
import { once } from "./event/once";
import fxLanguage from "./../languages/cn";
export default class fxClass {
    constructor() {
        [
            (<any>dom),
            (<any>eleEqualStr),
            (<any>eventsPath),
            (<any>getTagName),
            (<any>off),
            (<any>on),
            (<any>once),

        ].forEach(k => {
            for (let i in k) {
                if ((<any>fxClass).prototype[i]) { new Error(`${fxLanguage.index.error}${i}`); }
                (<any>fxClass).prototype[i] = (<any>k[i]);
            }

        })
    }
}


export {
  dom,
  eleEqualStr,
  eventsPath,
  getTagName,
  off,
  on,
  once,
};