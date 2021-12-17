var path = require("path");
var paths = {
    jspages: [
        //  getSrc("./test/test.ts"),
        //  getSrc("./index/index.ts"),
        "./index/a/index.ts",
        "./index/a/index.ts"
    ]
};

exports.getSrc = function getSrc() {
    var pathAry = []
    paths.jspages.forEach(src => {
        pathAry.push(path.resolve(__dirname, '../../work/page', src))
    });
    return pathAry
}
//获取文件的绝对地址
// function getSrc(src) {
//     return path.resolve(__dirname, '../../work/page', src);
// }


exports.getdistSrc = function distSrc() {
    var pathAry = []
    paths.jspages.forEach(src => {
        pathAry.push(path.resolve(__dirname, '../../dist/scripts', src.replace(".ts", ".js")))
    });
    return pathAry
}

function isArrayFn(value) {
    if (typeof Array.isArray === "function") {
        return Array.isArray(value);
    } else {
        return Object.prototype.toString.call(value) === "[object Array]";
    }
}

paths.jspages.push("../public/script/index.ts");

exports.paths = paths;
exports.isArrayFn = isArrayFn;