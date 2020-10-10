import { USER_AGENT }from "./USER_AGENT";
import { IS_ANDROID } from "./IS_ANDROID";
import { ANDROID_VERSION } from "./ANDROID_VERSION";
const webkitVersionMap = (/AppleWebKit\/([\d.]+)/i).exec(USER_AGENT);
const appleWebkitVersion = webkitVersionMap ? parseFloat(webkitVersionMap.pop()) : null;
/**
 * 这是否是本机Android浏览器
 *
 * @return {Boolean}
 */
export const IS_NATIVE_ANDROID: Boolean = IS_ANDROID && ANDROID_VERSION < 5 && appleWebkitVersion < 537;
