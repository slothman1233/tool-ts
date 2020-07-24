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

interface contextmenuData {
    ele: any//右键的元素
    data: Array<contentData>
    callback?: Function //右键后的回调
}


interface kkpagerNewsModel {
    pagerid: string | number //分页容器id
    total: string | number //总页数
    pno: string | number //当前页码
    isShowTotalPage?: boolean //是否显示总页数
    isShowCurrPage?: boolean  //是否显示总记录数
    isGoPage?: boolean //是否显示页码跳转输入框
    mode?: string //分页类型：link（链接类型），click（点击类型）
    hrefFormer?: string //链接前部（mode:link有效）
    hrefLatter?: string //链接尾部（mode:link有效）
    getLink?: Function  //链接算法（mode:link有效） function (n) {}   n 当前的页码
    click?: Function //点击执行（mode:click有效） function (n, config) {} //n  当前页面   config:{total: 10, pagerid: "kkpager"} 总页数 当前容器id
}


interface proportionModel {
    imageUrl: string //图片地址
    parentEle?: Element //容器元素
    thumbnailSize?: Array<number> //缩略图片的尺寸 已宽为准 默认[120, 80, 40]
    InterceptWidth?: number //裁剪区域的宽            默认400
    InterceptHeight?: number //裁剪区域的高            默认400
    VirtualEdge?: number //半透明的大小        默认50 最高100
    BrokerRadius?: boolean //是否需要圆角的蒙版  默认false
    Isthumbnail?: boolean //是否需要缩略图      默认true
    narrowDom?: Element //点击执行缩小的元素
    enlargeDom?: Element //点击执行放大的元素
    Wheel?: number //点击放大缩小每次的大小  默认10px
    mousemoveCallback?: Function//拖动中的回调 mousemoveCallback(data)
    zoomCallback?: Function //缩放或者拖动后的回调 zoomCallback(data)
    //data {imageUrl:图片地址,width:缩略图的宽,height:缩略图的高,x:截取的X坐标,y:截取的Y坐标,CoordinateWidth:截取的宽,CoordinateHeight:截取的高}

}