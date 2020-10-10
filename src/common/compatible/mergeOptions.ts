import { isPlain } from "./../obj/isPlain";
import { each } from "./../obj/each";
/**
 * 合并对象
 * @param { Array<any> } args 所有的参数   后面的参数替换前面的参数
 * @param sources 需要合并的对象
 */
export function mergeOptions(...sources: Array<any>) {
    const result: any = {};
  
    sources.forEach(source => {
      if (!source) {
        return;
      }
  
      each((<any>source), (value: any, key: any) => {
        if (!isPlain(value)) {
          result[key] = value;
          return;
        }
  
        if (!isPlain(result[key])) {
          result[key] = {};
        }
  
        result[key] = mergeOptions(result[key], value);
      });
    });
  
    return result;
  }