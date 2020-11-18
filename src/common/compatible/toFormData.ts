/**
 *@param {Object} data 需要转换的数据
 *@return {Object} FormData 
 */ 
export function toFormData(data:any){
    const formData = new FormData();
    if(!data)return formData;
    Object.keys(data).forEach(key=>{
        formData.append(key,data[key]!==void 0?(data[key] as number).toString():"");
    })
    return formData
}