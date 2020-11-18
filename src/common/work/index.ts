
import serverwork from "./serverwork";
import webwork from "./webwork";

export default class fxClass {
  constructor() {
    [
      (<any>webwork),
      (<any>serverwork)
    ].forEach(k => {
      for (let i in k) {
          (<any>fxClass).prototype[i] = (<any>k[i]);
      }

  })
  }
}

export {
  webwork,
  serverwork

};