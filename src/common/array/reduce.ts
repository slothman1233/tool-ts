if (!Array.prototype.reduce) {
    Array.prototype.reduce = function (callback:any /*, initialValue*/) {
        if (this == null) {
            throw new TypeError('"this" is null or not defined');
        }
        if (typeof callback != "function") {
            throw new TypeError();
        }
        var o = Object(this);
        var len = o.length >>> 0;
        var k = 0;
        var value;
        if (arguments.length >= 2) {
            value = arguments[1];
        } else {
            while (k < len && !(k in o)) {
                k++;
            }
            if (k >= len) {
                throw new TypeError('Reduce of empty array ' + 'with no initial value');
            }
            value = o[k++];
        }
        while (k < len) {
            if (k in o) {
                value = callback(value, o[k], k, o);
            }
            k++;
        }
        return value;
    };
}