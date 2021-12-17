import window from "../window"
export const keys = function(){
    if (!Object.keys){
        let objKeys = function(o) {
            if (o !== Object(o))
            throw new TypeError('Object.keys called on a non-object');
            var k=[],p;
            for (p in o) if (Object.prototype.hasOwnProperty.call(o,p)) k.push(p);
            return k;
        }
        window.Object.keys = objKeys;
        return objKeys;
    } 
    return window.Object.keys     
}()