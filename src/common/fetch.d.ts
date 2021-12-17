declare const get: (url: any, params?: {}) => Promise<Response>;
declare const post: (url: any, paramsObj: any) => Promise<Response>;
export { get, post };
