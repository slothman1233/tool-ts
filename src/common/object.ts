
import { keys } from "./object/keys";
import fxLanguage from "./../languages/cn";
export default class fxClass {
    constructor() {
        [
            (<any>keys),
        ].forEach(k => {
            for (let i in k) {
                if ((<any>fxClass).prototype[i]) { new Error(`${fxLanguage.index.error}${i}`); }
                (<any>fxClass).prototype[i] = (<any>k[i]);
            }

        })
    }
}

export {
  keys,
};