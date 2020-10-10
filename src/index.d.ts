/// <reference path="languages/language.d.ts" />
import * as compatible from "./common/compatible";
import * as browser from "./common/browser";
import * as computedStyle from "./common/computed-style";
import * as dom from "./common/dom";
import * as obj from "./common/obj";
import * as subscrible from "./common/subscrible";
import * as log from "./common/log";
import * as event from "./common/event";
import * as requestNextAnimationFrame from "./common/requestNextAnimationFrame";
import * as promise from "./common/promise";
import "./common/es6";
export default class fxClass {
    language: object;
    constructor(language: langStatic);
}
export { compatible, browser, computedStyle, dom, obj, subscrible, log, requestNextAnimationFrame, event, promise, };
