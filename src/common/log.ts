
import { log } from "./log/log";
import { popup } from "./log/popup";
import fxLanguage from "./../languages/cn";
export default class fxClass {
    constructor() {
        [
            (<any>log),
            (<any>popup),

        ].forEach(k => {
            for (let i in k) {
                if ((<any>fxClass).prototype[i]) { new Error(`${fxLanguage.index.error}${i}`); }
                (<any>fxClass).prototype[i] = (<any>k[i]);
            }

        })
    }
}

export {
  log,
  popup,
};


