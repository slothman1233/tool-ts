import { IS_CHROME } from "./IS_CHROME";
import { IS_IOS } from "./IS_IOS";
import { IS_IOS_SAFARI } from "./IS_IOS_SAFARI";
/**
 * 是否是Safari
 *
 * @return {Boolean}
 */
export const IS_SAFARI = (IS_IOS_SAFARI || IS_IOS) && !IS_CHROME;
