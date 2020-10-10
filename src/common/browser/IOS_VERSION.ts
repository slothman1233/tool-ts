import { USER_AGENT }from "./USER_AGENT";
/**
 * ios的版本号 没有则返回null
 *
 * @return {string|null}
 */
export const IOS_VERSION: string | null = (function () {
    const match = USER_AGENT.match(/OS (\d+)_/i);
  
    if (match && match[1]) {
      return match[1];
    }
    return null;
  }());