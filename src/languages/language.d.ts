
interface index {
    error: string
}

interface httprequest {
    timeOut: string
    noAuthority: string
    parameterError: string
}

interface dom {
    throwWhitespace: string
    notElement: string
}
interface select {
    prompt: string
}

interface  proportion{
    noImg:string
    noParentEle:string
}

interface langStatic {
    index: index
    httprequest: httprequest
    dom: dom
    select: select
    proportion:proportion
}


declare let fxLanguage: langStatic




