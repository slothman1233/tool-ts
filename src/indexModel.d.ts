interface IE8HTMLInputElement extends HTMLInputElement {
    attachEvent(event: string, listener: EventListener): boolean;
    detachEvent(event: string, listener: EventListener): boolean;
}

interface events {
    clientList: object
    listen(key: string, fn:any):void
    trigger(key:any, ...arg:any[]):void
    remove(key:any, fn?:any):void
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
    fn:any
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
    new(method:any): Promises;
    then(resolve:any, reject?:any): Promises;
    catch(e:any): Promises;
    all(data:any): Promises
    resolve(arg:any): Promises
    reject(data:any): Promises

}



interface contentData {
    id?: string  //唯一标识
    content: string  //内容元素
    children: Array<contentData> //子项
    callback?: Function //点击后的回调
}
