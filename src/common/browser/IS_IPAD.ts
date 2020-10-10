import { USER_AGENT }from "./USER_AGENT";
/**
 * 是否是ipad
 *
 * @static
 * @const
 * @type {Boolean}
 */
export const IS_IPAD: boolean = (/iPad/i).test(USER_AGENT);