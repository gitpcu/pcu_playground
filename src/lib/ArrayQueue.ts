
export default class ArrayQueue<T> {
    private _array: T[];
    private _first: T;
    private _last: T;
    private _size: number;

    constructor(size: number) {
        this._array = new Array<T>(size);
        this._size = size;
    }

    enqueue() {

    }
    dequeue() {

    }
    peek() {

    }
    empty() {

    }
    getIterator() {
        
    }
    private error(type: string) {

    }
}