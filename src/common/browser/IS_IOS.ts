import { IS_IPHONE } from "./IS_IPHONE";
import { IS_IPAD } from "./IS_IPAD";
import { IS_IPOD } from "./IS_IPOD";
/**
 * 是否是ios
 *
 * @return {Boolean}
 */
export const IS_IOS: boolean = IS_IPHONE || IS_IPAD || IS_IPOD;
