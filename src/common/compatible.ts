
import { addEvent } from "./compatible/addEvent";
import { removeEvent } from "./compatible/removeEvent";
import { getCookie } from "./compatible/getCookie";
import { setCookie } from "./compatible/setCookie";
import { GetQueryString } from "./compatible/GetQueryString";
import { GethashString } from "./compatible/GethashString";
import { mergeOptions } from "./compatible/mergeOptions";
import { extend } from "./compatible/extend";
import { addScriptLoad } from "./compatible/addScriptLoad";
import { addLinkLoad } from "./compatible/addLinkLoad";
import { toFormData } from "./compatible/toFormData";
import { dataState } from "./compatible/dataState";
import { strlen } from "./compatible/strlen";
import { index } from './compatible/index';
import { trim } from './compatible/trim';
import { toFixeds } from "./compatible/toFixeds";
import { getChildElementNodes } from "./compatible/getChildElementNodes";
import fxLanguage from "./../languages/cn";
export default class fxClass {
    constructor() {
        [
            (<any>addEvent),
            (<any>removeEvent),
            (<any>getCookie),
            (<any>setCookie),
            (<any>GetQueryString),
            (<any>GethashString),
            (<any>mergeOptions),
            (<any>extend),
            (<any>addScriptLoad),
            (<any>addLinkLoad),
            (<any>toFormData),
            (<any>dataState),
            (<any>strlen),
            (<any>index),
            (<any>trim),
            (<any>toFixeds),
            (<any>getChildElementNodes)

        ].forEach(k => {
            for (let i in k) {
                if ((<any>fxClass).prototype[i]) { new Error(`${fxLanguage.index.error}${i}`); }
                (<any>fxClass).prototype[i] = (<any>k[i]);
            }

        })
    }
}


export {
  addEvent,
  removeEvent,
  getCookie,
  setCookie,
  GetQueryString,
  GethashString,
  mergeOptions,
  extend,
  addScriptLoad,
  addLinkLoad,
  toFormData,
  dataState,
  strlen,
  index,
  trim,
  toFixeds,
  getChildElementNodes,
};