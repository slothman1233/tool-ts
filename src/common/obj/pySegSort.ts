/**
 * 中文按照拼音排序，并且可以将中文按照a,b,c,d……进行区分
 * @param arr 需要排序的数据数组
 */
import { each } from "./each"


export function pySegSort(arr:any,arr1?:any) {
    if(!String.prototype.localeCompare)
    return null;

    let letters:Array<string> = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    let zh:Array<string> = "阿八嚓哒额发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    let en:Array<string> = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
    let reg = new RegExp("^[a-zA-Z]");
    let segs:Array<any> = [];
    let objs:any = {};
    let curr:any;
    let index:number = 0;
    each(letters, function(value:any,i:any){
        curr = {letter: value, data:[],id:[]};
        if(value !== "I"&&value !== "U"&&value !== "V"){
            each(arr, function(val:any,item:any) {
                if(i<=0&&arr1&&arr1[item]){objs[val] = arr1[item]};
                if((!zh[index-1] || zh[index-1].localeCompare(val) <= 0) && val.localeCompare(zh[index]) == -1) {
                    curr.data.push(val);
                }
                if(reg.test(val)&&en[i-1]&&val[0].toUpperCase() === en[i-1]){
                    curr.data.push(val);
                }
            });
            index++;
        }else{
            each(arr, function(val:any,item:any) {
                if(reg.test(val)&&en[i-1]&&val[0].toUpperCase() === en[i-1]){
                    curr.data.push(val);
                }
            })
        }
        if(curr.data.length) {
            segs.push(curr);
            curr.data.sort(function(a:any,b:any){
                return a.localeCompare(b);
            });
            if(JSON.stringify(objs) !== "{}"){
                each(curr.data,function(vals:any){
                    let dataId = objs[vals]?objs[vals]:0;
                    curr.id.push(dataId)
                })
            }
        }
    });
    return segs;
};