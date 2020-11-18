work 线程池的方法
====

目录
-----

1. [webwork](#webworkjs) 

    webwork.ts: web端的work线程池控制

2. [serverwork](#serverworkjs)

    serverwork.ts: server端的work线程池控制

## webwork.js
<div id="webwork"></div>
   *引入路径：import webwork from "@stl/tool-ts/src/common/work/webwork"*
    new webwork(path,num)  
    * @param {number} path 子线程js地址 
    * @param {number} num 开启线程数量
```
使用方法:
    主线程
    import webwork from "@stl/tool-ts/src/common/work/webwork";

    //初始化线程池
    const worker = new workjs('/script/b.js', 3)

    //错误示范
    // await 卡住了整个for循环
    // for (let i = 0; i < 100; i++) {
    //     const ss = await worker.run<string>(i + 'WWWEERERERERER')
    //     console.log(ss)
    // }
    // worker.destroy()


    //正确的使用方式
    let a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41]

    Promise.all(a.map(async item => {
        //执行线程
        const ss = await worker.run(item + 'WWWEERERERERER')
        console.log(ss)
        return ss
    })).then((t) =>{
        console.log(t)
        //关闭线程
        worker.destroy()
    })

    ------------------------ 子线程  ------------------------

    self.onmessage = function(data){
        self.postMessage(data + '333')
    }


```




