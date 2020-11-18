
import webwork from "./webwork";
import serverwork from "./serverwork";

export default class fxClass {
  constructor() {
    [
      (<any>webwork),
      (<any>serverwork)
    ].forEach(k => {
      (<any>fxClass).prototype[k] = (<any>k[k]);

    })
  }
}

export {
  webwork,
  serverwork

};