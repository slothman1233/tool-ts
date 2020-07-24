import window from "./window"




export const promise = function () {
    if (!window.Promise) {
        class Promise {
            cache:any
            enum:any
            status:any
            msg:any
            constructor(...arg:Array<any>) {
                var that = this;
                var process = arg[0];
                that.cache = []; //缓存有的then catch方法
                that.msg = "";
                that.enum = {
                    padding: "padding",
                    resolve: "resolve",
                    reject: "reject"
                }
                that.status = that.enum.padding;

                process(function () {
                    that.status = "resolve";
                    that.msg = arguments[0];
                    that.method();
                }, function () {
                    that.status = that.enum.reject;
                    that.msg = arguments[0];
                    that.method();
                })

                return that;
            }

            method() {
                let that = this;
                for (let i = that.cache.length; i > 0; i--) {
                    let obj = that.cache.shift();

                    if (obj.type === that.status) {
                        try {
                            var msg = obj.fn(that.msg);
                            that.status = that.enum.resolve;
                            //在then 或者 catch 的返回值 是否是new Promise;
                            if (!!msg && msg.constructor === Promise) {
                                msg.msg = that.msg;
                                msg.cache = that.cache;
                                msg.status = that.status;
                                return;
                            } else {
                                that.msg = msg;
                            }
                        } catch (e) {
                            that.msg = e;
                            that.status = "reject";
                        }
                    }
                }

                return that;

            }

            then(...arg:Array<any>) {
                if (this.status == this.enum.padding) {
                    this.cache.push({ type: this.enum.resolve, fn: arg[0] })
                } else if (this.status == this.enum.resolve) {
                    this.msg = arg[0](this.msg);
                } else if (this.status == this.enum.reject && arg[1]) {
                    this.msg = arg[1](this.msg);
                }
                return this;
            }

            catch(callback:any) {
                if (this.status == this.enum.padding) {
                    this.cache.push({ type: this.enum.reject, fn: callback })
                } else if (this.status == this.enum.reject) {
                    callback(this.msg);
                }
                return this;
            }

            static resolve = function (...arg:Array<any>) {
                if (arg.length <= 0) {
                    return new Promise(function (resolve:any, reject:any) { resolve() });
                } else {
                    if (arg[0].constructor === Promise) {
                        return arg[0];
                    } else {
                        return new Promise(function (resolve:any, reject:any) { resolve(arg[0]) });
                    }
                }

            }

            static reject = function (data:any) {
                return new Promise(function (resolve:any, reject:any) { reject(arguments) })

            }

            static all = function (data:any) {
                return new Promise(function (resolve:any, reject:any) {
                    let promises = Object.prototype.toString.call(data) !== "[object Array]" ? [data] : data;
                    let promiseNum = promises.length;
                    let resolvedCounter = 0;
                    let resolvedValues:Array<any> = [];
                    for (var i = 0; i < promiseNum; i++) {
                        let index = i;
                        Promise.resolve(promises[index]).then(function (value:any) {
                            resolvedCounter++;
                            resolvedValues[index] = value;
                            if (resolvedCounter == promiseNum) {

                                return resolve(resolvedValues);
                            }
                        }, function (e:any) {
                            return reject(e);
                        })
                    }

                })

            }
        }
        return Promise;
    }
    return window.Promise;

}()