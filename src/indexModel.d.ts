interface IE8HTMLInputElement extends HTMLInputElement {
    attachEvent(event: string, listener: EventListener): boolean;
    detachEvent(event: string, listener: EventListener): boolean;
}

interface events {
    clientList: object
    listen(key: string, fn)
    trigger(key, ...arg)
    remove(key, fn?)
}

interface xhr {
    get(data: xhrModel): void
    post(data: xhrModel): void
    delete(data: xhrModel): void
    postbody(data: xhrModel): void
}

interface xhrModel {
    url: string
    type: string
    async?: boolean
    dataType?: string
    data?: object | string
    headers?: object
    success: any
    beforeSend?: any
    isFromdata?:boolean
    complete?: any
    error: any
}

interface listenDataModel {
    agent?: any
    ele: string
    events: string
    fn
}

interface ajaxfileupdateModel {
    url: string
    type: number | string
    dataType?: string
    data: updateDateMoel
    fileElementId: string
    beforeSend?: Function
    success: Function
    error: Function
    complete?: Function
    secureuri?: boolean
    filesize?: number
    FileTypeArray?: Array<string>
}

interface updateDateMoel {
    FileElementId: string
    FileType: number
    Uid: string
}


interface Promises {
    new(method): Promises;
    then(resolve, reject?): Promises;
    catch(e): Promises;
    all(data): Promises
    resolve(arg): Promises
    reject(data): Promises

}



interface contentData {
    id?: string  //唯一标识
    content: string  //内容元素
    children: Array<contentData> //子项
    callback?: Function //点击后的回调
}
