import { mergeOptions } from "./compatible/mergeOptions";
interface scrollObj{
  dom?:HTMLElement,
  destination?:number,
  time?:number,
  type?:number,
}
interface easeoutObj extends scrollObj{
  position:number,
  callback:(val:number,dom:HTMLElement)=>void
}
function getSpeed(position:number,destination:number,rate:number,obj:any){
  switch(obj.type){//可以扩展其他运动轨迹
    case 1:
    return position + (destination - position) / rate
  }
}
const easeout = function (obj:easeoutObj) {
  if (obj.position === obj.destination || typeof obj.destination !== 'number') {
    return false;
  }
  let rate = Math.ceil(obj.time/17);
  let speed = (obj.destination - obj.position) / rate;
  // 不存在原生`requestAnimationFrame`，用`setTimeout`模拟替代
  if (!window.requestAnimationFrame) {
    (<any>window).requestAnimationFrame = function (fn:any) {
      return setTimeout(fn, 17);
    }
  }
  var step = function () {
    obj.position = obj.type>0?getSpeed(obj.position,obj.destination,obj.time/100,obj):obj.position+speed;
    if (Math.abs(obj.destination - obj.position) < 2) {
      if(obj.dom === document.body)
        document.body.scrollTop = document.documentElement.scrollTop = obj.destination;
      else 
        obj.dom.scrollTop = obj.destination;
      return;
    }
    obj.callback(obj.position,obj.dom);
    requestAnimationFrame(step);
  };
  step();
}
export const getScrollTop = function (obj:scrollObj) {
  let initObj:scrollObj = {dom:document.body,destination:0,time:1000,type:1}
  let options = mergeOptions(initObj,obj);
  let scrollTopObj = {
    position:options.dom === document.body ? (document.documentElement.scrollTop || document.body.scrollTop):options.dom.scrollTop,
    callback:function (val:number,dom:HTMLElement) {
      if(dom === document.body)window.scrollTo(0, val);
      else dom.scrollTop = val;
    }
  }
  easeout(mergeOptions(options,scrollTopObj));
}