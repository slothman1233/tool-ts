import { USER_AGENT }from "./USER_AGENT";
import { IS_CHROME } from "./IS_CHROME";
import { IS_ANDROID } from "./IS_ANDROID";
import { IS_EDGE } from "./IS_EDGE";
/**
 * 是否是ios下的Safari
 *
 * @return {Boolean}
 */
export const IS_IOS_SAFARI = (/Safari/i).test(USER_AGENT) && !IS_CHROME && !IS_ANDROID && !IS_EDGE;
