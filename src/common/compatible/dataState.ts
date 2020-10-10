/**
 * 请求回传的状态
 * @param {string} subCode 状态码
 * @return {boolean} true 成功 false 失败
 */
export function dataState(subCode: string) {
    let state = subCode.slice(-2);
    if (state === "00") return true;
    return false;
  }