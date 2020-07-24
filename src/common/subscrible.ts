import { log } from "./log";


/**
 * 发布订阅模式
 */
class events {
    clientList: any = {}
    constructor() {
    }
    /**
* 添加订阅者
* @param {string} key 订阅名称
* @param {Function} fn 订阅的函数
*/
    listen(key: string, fn: Function) {

        if (!this.clientList[key]) {
            this.clientList[key] = new Array;
        }
        this.clientList[key].push(fn);
    }

    /**
     * 发送消息
     * @param {string} key 订阅名称
     * @param {any} arg 函数的参数
     */
    trigger(key: string, ...arg: Array<any>) {
        if (!this.clientList[key] || this.clientList[key].length === 0) {
            return
        }

        this.clientList[key].forEach((fn: any) => {
            fn.apply(this, arg)
        });

    }

    /**
     * 取消订阅事件
     * @param {string} key 订阅名称
     * @param {function} fn 取消的函数 不传等于清空里面的所有的方法 
     */
    remove(key: string, fn?: Function) {
        if (!this.clientList[key]) {
            return
        }

        if (!fn) {
            this.clientList[key].length = 0;
            return
        }

        for (let i = this.clientList[key].length - 1; i >= 0; i--) {
            if (this.clientList[key][i] == fn) {
                this.clientList[key].splice(i, 1);
            }
        }
    }

}

/**
 * 动态安装 发布-订阅功能
 */
export let installEvents = () => {

    let obj = new events();
    return obj;
}




