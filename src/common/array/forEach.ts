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