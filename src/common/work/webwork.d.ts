declare type taskModel = {
    data: any;
    callback: (error: any, result: any) => void;
};
declare type workerByIdModel = {
    [propName: number]: Worker;
};
declare type wrokTypeModel = {
    [propName: number]: boolean;
};
/**
 * 线程池
 * @param {string} workerPath 需要在线程里面执行的js文件地址
 * @param {number} numberOfThreads 启动线程的数量 某人为CPU的数量
 */
declare class workerPool {
    _queue: Array<any>;
    _workerById: workerByIdModel;
    _activeWorkerById: wrokTypeModel;
    numberOfThreads: number;
    constructor(workerPath: string, numberOfThread?: number);
    /**
     * 寻找空闲的worker用于执行
     */
    getInactiveWorkerId(): number;
    /**
     * 调用 Worker 执行
     * @param {number} workerId worker索引
     * @param {any} taskObj data传给子线程的参数
            * error 失败的信息 成功的话error为null
            * result成功返回的信息
     */
    runWorker(workerId: number, taskObj: taskModel): void;
    /**
     * 执行线程
     * @param {any} data 传给子线程的参数
     */
    run<T>(data: any): Promise<T>;
    /**
     * 清空所有子线程
     */
    destroy(force?: boolean): void;
}
export default workerPool;
