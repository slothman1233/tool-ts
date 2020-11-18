
import { isObject } from "./obj/isObject";
import { getDataType } from "./obj/getDataType";
import { each } from "./obj/each";
import { isPlain } from "./obj/isPlain";
import { isString } from "./obj/isString";
import { NodeListToArray } from "./obj/NodeListToArray";
import { pySegSort } from "./obj/pySegSort";
import fxLanguage from "./../languages/cn";
export default class fxClass {
    constructor() {
        [
            (<any>isObject),
            (<any>getDataType),
            (<any>each),
            (<any>isPlain),
            (<any>isString),
            (<any>NodeListToArray),
            (<any>pySegSort),
        ].forEach(k => {
            for (let i in k) {
                if ((<any>fxClass).prototype[i]) { new Error(`${fxLanguage.index.error}${i}`); }
                (<any>fxClass).prototype[i] = (<any>k[i]);
            }

        })
    }
}

export {
  isObject,
  getDataType,
  each,
  isPlain,
  isString,
  NodeListToArray,
  pySegSort
};