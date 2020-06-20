/**
 * Spread an array into nested sub-arrays of a given index 
 * @param arr 
 * @param chunkSize 
 */
export function splitChunks(arr: Array<any>, chunkSize: number): Array<Array<any> | any> {
    const res = [];
    for (let i = 0, length = arr.length; i < length; i += chunkSize) {
        res.push(arr.slice(i, i + chunkSize));
    }
    return res;
}