/**
 * 中文按照拼音排序，并且可以将中文按照a,b,c,d……进行区分
 * @param arr 需要排序的数据数组
 */
import { each } from "./each"

export function pySegSort(arr:any) {
    if(!String.prototype.localeCompare)
        return null;

    let letters:Array<string> = "*abcdefghjklmnopqrstwxyz".split('');
    let zh:Array<string> = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split('');

    let segs:Array<any> = [];
    let curr:any;
    each(letters, function(value:any,i:any){
        curr = {letter: value, data:[]};
        each(arr, function(val:any) {
            if((!zh[i-1] || zh[i-1].localeCompare(val) <= 0) && val.localeCompare(zh[i]) == -1) {
                curr.data.push(val);
            }
        });
        if(curr.data.length) {
            segs.push(curr);
            curr.data.sort(function(a:any,b:any){
                return a.localeCompare(b);
            });
        }
    });
    return segs;
};