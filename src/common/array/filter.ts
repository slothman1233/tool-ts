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