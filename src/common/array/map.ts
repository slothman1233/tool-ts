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