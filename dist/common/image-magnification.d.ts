interface imgMagnificationModel {
    parentEle: any;
    prevBgImg: string;
    nextBgImg: string;
    closeBgImg: string;
    IsBox: boolean;
    isPaging: boolean;
}
/**
 * 图片放大 带单图和多图的
 *    <img src="" title="描述" data-viewer="大图">
 *
 * @param {object} options {parentEle:parentEle,prevBgImg:prevBgImg,nextBgImg:nextBgImg,closeBgImg:closeBgImg,IsBox:IsBox,isPaging:isPaging}
        * @param {Element|string|Array<Element>|Array<string>} parentEle 图片集合的父元素或者元素字符串
        * @param {string} prevBgImg 上一张按钮图片 默认有图片
        * @param {string} nextBgImg 下一张按钮图片 默认有图片
        * @param {string} closeBgImg 关闭按钮图片 默认有图片
        * @param {boolean} IsBox 是否需要显示背景 默认true
        * @param {boolean} isPaging 是否需要翻页 默认true
 * example
 *  <div id="solo1">
      <div class="Imgms">
          <img src="http://upload.fx110.com/files/thumbnail/201702/529CFE3C42BC3F613FCCE51B8D0F4B94.png" title="dfasdfad1sf" data-viewer="https://cdn-flash.jin10.com/b230ba5d-48a2-4d9f-bd96-98cf85737104.png">
      </div>
      <div class="Imgms">
          <img src="http://upload.fx110.com/files/thumbnail/201702/529CFE3C42BC3F613FCCE51B8D0F4B94.png" title="dfasdfa2dsf" data-viewer="http://upload.fx110.com/files/thumbnail/201702/529CFE3C42BC3F613FCCE51B8D0F4B94.png">
      </div>
      <div class="Imgms">
          <img src="http://upload.fx110.com/files/thumbnail/201702/529CFE3C42BC3F613FCCE51B8D0F4B94.png" title="dfasdfa3dsf" data-viewer="http://upload.fx110.com/files/thumbnail/201702/529CFE3C42BC3F613FCCE51B8D0F4B94.png">
      </div>
      <p>asdfsdfasdfsdfsdf</p>
  </div>

  fx.imgMagnification({parentEle:document.getElementById("solo1")})
 */
export declare const imgMagnification: (options: imgMagnificationModel) => void;
export {};
