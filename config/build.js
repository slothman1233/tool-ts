const paths = {
    // fxcn: {
    //     input: './src/index/fxcn.ts', //入口未见
    //     jsfile: "index.js", //js输出文件
    //     lessfile: "index.css", //样式输出的文件
    //     format: "umd", //输出格式：立即执行函数表达式   which can be one of 'amd', 'cjs', 'system', 'esm', 'iife' or 'umd'
    //     name: "fx", //umd or iife 下的方法的命名
    // },
    // fxen: {
    //     input: './src/index/fxen.ts', //入口未见
    //     jsfile: "./dist/fxen.js", //js输出文件
    //     lessfile: "./dist/fxen.css", //样式输出的文件
    //     format: "umd", //输出格式：立即执行函数表达式   which can be one of 'amd', 'cjs', 'system', 'esm', 'iife' or 'umd'
    //     name: "fx", //umd or iife 下的方法的命名
    // }
    index: {
        input: './index.ts', //入口未见
        jsfile: "./index.js", //js输出文件
        lessfile: "index.css", //样式输出的文件
        format: "umd", //输出格式：立即执行函数表达式   which can be one of 'amd', 'cjs', 'system', 'esm', 'iife' or 'umd'
        name: "fx", //umd or iife 下的方法的命名
    },
}

// 需要生成的文件
const jspages = [
    "index"
    // "fxcn",
    // "fxen"

]


export {
    paths,
    jspages
}