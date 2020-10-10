import { USER_AGENT }from "./USER_AGENT";
/**
 * 是否是iPod
 *
 * @static
 * @const
 * @return {Boolean}
 */
export const IS_IPOD: boolean = (/iPod/i).test(USER_AGENT);