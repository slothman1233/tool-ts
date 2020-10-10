import { USER_AGENT }from "./USER_AGENT";
import { IS_IPAD } from "./IS_IPAD";
/**
 * 是否是iPhone
 *

 * @return {Boolean}
 */
export const IS_IPHONE: boolean = (/iPhone/i).test(USER_AGENT) && !IS_IPAD;
