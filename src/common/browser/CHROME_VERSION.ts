import { USER_AGENT }from "./USER_AGENT";
/**
 * Chrome的版本号 没有则返回null
 *
 * @return {number|string|null}
 */
export const CHROME_VERSION: number | string | null = (function () {
    const match = USER_AGENT.match(/(Chrome|CriOS)\/(\d+)/);
  
    if (match && match[2]) {
      return parseFloat(match[2]);
    }
    return null;
  }());