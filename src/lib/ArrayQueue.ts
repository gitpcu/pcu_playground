
export default class ArrayQueue<T> {
    private _array: T[];
    private _size: number;
    private _first: number;
    private _last: number;

    constructor(size: number) {
        this._array = new Array<T>(size);
        this._size = size;
        this._first = size-1;
        this._last = size;
    }

    enqueue(data: T) {
        if(this._last <= 0) {
            this.error('enqueue');
            return;
        }

        this._last--;
        this._array[this._last] = data;
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