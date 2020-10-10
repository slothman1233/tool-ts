import { USER_AGENT }from "./USER_AGENT";
/**
 * android的版本号 没有则返回null
 *
 * @return {number|string|null}
 */
export const ANDROID_VERSION: number | string | null = (function () {

    const match = USER_AGENT.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);
  
    if (!match) {
      return null;
    }
  
    const major = match[1] && parseFloat(match[1]);
    const minor = match[2] && parseFloat(match[2]);
  
    if (major && minor) {
      return parseFloat(match[1] + '.' + match[2]);
    } else if (major) {
      return major;
    }
    return null;
  }());