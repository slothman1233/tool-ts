interface updateDateMoel {
    FileElementId: string;
    FileType: number;
    Uid: string;
}
interface ajaxfileupdateModel {
    url: string;
    type: number | string;
    dataType?: string;
    data: updateDateMoel;
    fileElementId: string;
    beforeSend?: Function;
    success: Function;
    error: Function;
    complete?: Function;
    secureuri?: boolean;
    filesize?: number;
    FileTypeArray?: Array<string>;
}
/**
 * 上传图片视频或者音频
 * fx.updateFile(data)
 * @param {ajaxfileupdateModel} data 上传需要的数据
 * data:{
 * @param {string} url:用于文件上传的服务器端请求地址
 * @param {string} type:请求类型 "get、post"
 * @param {number} filesize 文件的大小限制 默认 1024 * 1024 * 50
 * @param {object} data:
        * {
        * @param {string} FileElementId:input的id,
        * @param {number} FileType上传的类型  1 图片   2音频   3视频
        * @param {string} Uid 用户id
        * }
 * @param {string} dataType:返回的类型
 * @param {Function} beforeSend 请求执行前的回调
 * @param {Function} success(data) 成功后的回调
         *  @param {object} 服务器回传的数据
 * @param {Function} error(s,type,e)  失败后的回调
        * @param  {object } s 上传的参数
        * @param { object } type 错误类型
        * @param { any } e 程序错误的说明
 * @param {Function} complete  请求完成不管成功还是失败都会执行
  * }
 * @example
   document.getElementById('upload-file').onchange = function () {
            fx.updateFile({
                url: "/UploadFile/Post", //用于文件上传的服务器端请求地址
                type: "post",
                data: { FileElementId: "upload-file", FileType: 1, Uid: 123 }, //此参数非常严谨，写错一个引号都不行
                secureuri: false, //一般设置为false
                fileElementId: "upload-file", //文件上传空间的id属性  <input type="file" id="file" name="file" />
                dataType: "dataType", //返回值类型 一般设置为json
                FileTypeArray:[] //允许传的文件类型
                success: function (d) {
                    console.log(d);
                },
                error: function (data, status, e) {
                }
            })
        }

 */
export declare let updateFile: (datas: ajaxfileupdateModel) => {
    abort: () => void;
};
export {};
