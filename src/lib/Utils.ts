

/* 2차원 배열까지만 가능 */
export const deepCopyArray = (arr: any[]) => {
    const length = arr.length;
    let newArr = new Array<any>(length);

    if(Array.isArray(arr[0])) {
        const innerLength = arr[0].length;
        for(let i=0; i<length; i++) {
            newArr[i] = deepCopyArray(arr[i]);
        }
    } else {
        if(typeof arr[0] == "object") {
            for(let i=0; i<length; i++) {
                newArr[i] = JSON.parse(JSON.stringify(arr[i]));
            }
        } else {
            for(let i=0; i<length; i++) {
                newArr[i] = arr[i];
            }
        }
    }

    return newArr;
}