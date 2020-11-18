if (!Array.prototype.find) {
    Array.prototype.find = function (callback:any) {
        if (this == null) {
            throw new TypeError('"this" is null or not defined');
        }
        if (typeof callback != "function") {
            throw new TypeError();
        }
        var o = Object(this);
        var len = o.length >>> 0;
        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        var k = 0;
        while (k < len) {
            var kValue = o[k];
            if (callback.call(thisArg, kValue, k, o)) {
                return kValue;
            }
            k++;
        }
        return undefined;
    };
}