import { USER_AGENT }from "./USER_AGENT";
import { IS_EDGE } from "./IS_EDGE"
/**
* 是否是Chrome
*
* @return {Boolean}
*/
export const IS_CHROME: Boolean = !IS_EDGE && ((/Chrome/i).test(USER_AGENT) || (/CriOS/i).test(USER_AGENT));
