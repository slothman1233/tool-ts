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

// indexOf()
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (ele:any) {
        // 获取数组长度
        var len = this.length;
        // 检查值为数字的第二个参数是否存在，默认值为0
        var fromIndex = Number(arguments[1]) || 0;
        // 当第二个参数小于0时，为倒序查找，相当于查找索引值为该索引加上数组长度后的值
        if (fromIndex < 0) {
            fromIndex += len;
        }
        // 从fromIndex起循环数组
        while (fromIndex < len) {
            // 检查fromIndex是否存在且对应的数组元素是否等于ele
            if (fromIndex in this && this[fromIndex] === ele) {
                return fromIndex;
            }
            fromIndex++;
        }
        // 当数组长度为0时返回不存在的信号：-1
        if (len === 0) {
            return -1;
        }
    };
}

// forEach()
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function forEach(callback:any) {
        // 获取数组长度
        var len = this.length;
        if (typeof callback != "function") {
            throw new TypeError();
        }
        // thisArg为callback 函数的执行上下文环境
        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++) {
            if (i in this) {
                // callback函数接收三个参数：当前项的值、当前项的索引和数组本身
                callback.call(thisArg, this[i], i, this);
            }
        }
    };
}

if (!Array.prototype.map) {
    Array.prototype.map = function (callback:any) {
        // 获取数组长度
        var len = this.length;
        if (typeof callback != "function") {
            throw new TypeError();
        }
        // 创建跟原数组相同长度的新数组，用于承载经回调函数修改后的数组元素
        var newArr = new Array(len);
        // thisArg为callback 函数的执行上下文环境
        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++) {
            if (i in this) {
                newArr[i] = callback.call(thisArg, this[i], i, this);
            }
        }
        return newArr;
    };
}

if (!Array.prototype.filter) {
    Array.prototype.filter = function (func:any) {
        var arr = this;
        var r = [];
        for (var i = 0; i < arr.length; i++) {
            if (func(arr[i], i, arr)) {
                r.push(arr[i]);
            }
        }
        return r;
    }
}


if (!Array.prototype.some) {
    Array.prototype.some = function (callback:any) {
        // 获取数组长度
        var len = this.length;
        if (typeof callback != "function") {
            throw new TypeError();
        }
        // thisArg为callback 函数的执行上下文环境
        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++) {
            if (i in this && callback.call(thisArg, this[i], i, this)) {
                return true;
            }
        }
        return false;
    };
}

if (!Array.prototype.every) {
    Array.prototype.every = function (callback:any) {
        // 获取数组长度
        var len = this.length;
        if (typeof callback != "function") {
            throw new TypeError();
        }
        // thisArg为callback 函数的执行上下文环境
        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++) {
            if (i in this && !callback.call(thisArg, this[i], i, this)) {
                return false;
            }
        }
        return true;
    };
}

if (!Array.prototype.findIndex) {
    Array.prototype.findIndex = function (callback:any) {
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
                return k;
            }
            k++;
        }
        return -1;
    };
}

if (!Array.prototype.copyWithin) {
    Array.prototype.copyWithin = function (target:any, start:any /*, end*/) {
        if (this == null) {
            throw new TypeError('this is null or not defined');
        }
        var O = Object(this);
        var len = O.length >>> 0;
        var relativeTarget = target >> 0;
        var to = relativeTarget < 0 ? Math.max(len + relativeTarget, 0) : Math.min(relativeTarget, len);
        var relativeStart = start >> 0;
        var from = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);
        var end = arguments[2];
        var relativeEnd = end === undefined ? len : end >> 0;
        var final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);
        var count = Math.min(final - from, len - to);
        var direction = 1;
        if (from < to && to < (from + count)) {
            direction = -1;
            from += count - 1;
            to += count - 1;
        }
        while (count > 0) {
            if (from in O) {
                O[to] = O[from];
            } else {
                delete O[to];
            }
            from += direction;
            to += direction;
            count--;
        }
        return O;
    };
}

if (!Array.prototype.includes) {
    Array.prototype.includes = function (searchElement:any, fromIndex:any) {
        if (this == null) {
            throw new TypeError('"this" is null or not defined');
        }
        var o = Object(this);
        var len = o.length >>> 0;
        if (len === 0) {
            return false;
        }
        var n = fromIndex | 0;
        var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
        while (k < len) {
            if (o[k] === searchElement) {
                return true;
            }
            k++;
        }
        return false;
    };
}

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