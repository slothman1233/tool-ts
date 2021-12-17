import { USER_AGENT }from "./USER_AGENT";
/**
 * 是否是火狐浏览器
 *
 * @return {Boolean}
 */
export const IS_FIREFOX: Boolean = (/Firefox/i).test(USER_AGENT);

