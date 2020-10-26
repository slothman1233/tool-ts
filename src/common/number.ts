
import { cutNumber } from "./number/cutNumber";
import { tranNumber } from "./number/tranNumber";
import { makeupDecimal } from "./number/makeupDecimal";
import { unmakeupDecimal } from "./number/unmakeupDecimal";
import fxLanguage from "./../languages/cn";
export default class fxClass {
    constructor() {
        [
            (<any>cutNumber),
            (<any>tranNumber),
            (<any>makeupDecimal),
            (<any>unmakeupDecimal),            

        ].forEach(k => {
            for (let i in k) {
                if ((<any>fxClass).prototype[i]) { new Error(`${fxLanguage.index.error}${i}`); }
                (<any>fxClass).prototype[i] = (<any>k[i]);
            }

        })
    }
}


export {
  cutNumber,
  tranNumber,
  makeupDecimal,
  unmakeupDecimal
};