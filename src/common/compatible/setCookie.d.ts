/**
 * 写入cookie
 * @param {String} name  cookie名
 * @param {String} value cookie值
 * @param {String} time  存储时间 收一个字符是代表的时间名词
                        s20是代表20秒
                        h是指小时，如12小时则是：h12
                        d是天数，30天则：d30
 */
export declare const setCookie: (name: string, value: string, time: string) => void;
