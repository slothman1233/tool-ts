import { USER_AGENT }from "./USER_AGENT";
/**
 * 是否是Edge
 *
 * @return {Boolean}
 */
export const IS_EDGE: Boolean = (/Edge/i).test(USER_AGENT);
