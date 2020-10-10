
import { isEl } from "./dom/isEl";
import { isTextNode } from "./dom/isTextNode";
import { createEl } from "./dom/createEl";
import { textContent } from "./dom/textContent";
import { appendContent } from "./dom/appendContent";
import { normalizeContent } from "./dom/normalizeContent";
import { throwIfWhitespace } from "./dom/throwIfWhitespace";
import { classRegExp } from "./dom/classRegExp";
import { hasClass } from "./dom/hasClass";
import { setTableInnerHTML } from "./dom/setTableInnerHTML";
import { show } from "./dom/show";
import { hide } from './dom/hide';
import { toggle } from './dom/toggle';
import { siblings } from "./dom/siblings";
import { removeClass } from "./dom/removeClass";
import { addClass } from "./dom/addClass";
import { insertAfter } from './dom/insertAfter';
import { insertBefore } from './dom/insertBefore';
import { parent } from "./dom/parent";
import { parents } from "./dom/parents";
import { getOffset } from "./dom/getOffset";
import { getOffsetScroll } from "./dom/getOffsetScroll";
import { AllScroll } from "./dom/AllScroll";
import { getoffsetAndScroll } from "./dom/getoffsetAndScroll";
import { swapArray } from "./dom/swapArray";
import { remove } from "./dom/remove";
import { find } from "./dom/find";
import fxLanguage from "./../languages/cn";
export default class fxClass {
    constructor() {
        [
            (<any>isEl),
            (<any>isTextNode),
            (<any>createEl),
            (<any>textContent),
            (<any>appendContent),
            (<any>normalizeContent),
            (<any>throwIfWhitespace),
            (<any>classRegExp),
            (<any>hasClass),
            (<any>setTableInnerHTML),
            (<any>show),
            (<any>hide),
            (<any>toggle),
            (<any>siblings),
            (<any>removeClass),
            (<any>addClass),
            (<any>insertAfter),
            (<any>insertBefore),
            (<any>parent),
            (<any>parents),
            (<any>getOffset),
            (<any>getOffsetScroll),
            (<any>AllScroll),
            (<any>getoffsetAndScroll),
            (<any>swapArray),
            (<any>remove),
            (<any>find),

        ].forEach(k => {
            for (let i in k) {
                if ((<any>fxClass).prototype[i]) { new Error(`${fxLanguage.index.error}${i}`); }
                (<any>fxClass).prototype[i] = (<any>k[i]);
            }

        })
    }
}


export {
  isEl,
  isTextNode,
  createEl,
  textContent,
  appendContent,
  normalizeContent,
  throwIfWhitespace,
  classRegExp,
  hasClass,
  setTableInnerHTML,
  show,
  hide,
  toggle,
  siblings,
  removeClass,
  addClass,
  insertAfter,
  insertBefore,
  parent,
  parents,
  getOffset,
  getOffsetScroll,
  AllScroll,
  getoffsetAndScroll,
  swapArray,
  remove,
  find,
};