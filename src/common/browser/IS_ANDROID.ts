import { USER_AGENT }from "./USER_AGENT";
/**
 * 是否是android
 *
 * @return {Boolean}
 */
export const IS_ANDROID = (/Android/i).test(USER_AGENT);
