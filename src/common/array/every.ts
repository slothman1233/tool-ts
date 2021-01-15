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