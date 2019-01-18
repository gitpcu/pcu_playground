
export const deepCopyArray = (obj: any[]) => {
    const length = obj.length;
    let newArr = new Array<any>(length);

    if(Array.isArray(obj[0])) {
        const innerLength = obj[0].length;
        for(let i=0; i<length; i++) {
            newArr[i] = deepCopyArray(obj[i]);
        }
    } else {
        if(typeof obj[0] == "object") {
            for(let i=0; i<length; i++) {
                newArr[i] = JSON.parse(JSON.stringify(obj[i]));
            }
        } else {
            for(let i=0; i<length; i++) {
                newArr[i] = obj[i];
            }
        }
    }

    return newArr;
}