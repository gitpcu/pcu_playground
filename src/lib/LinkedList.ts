export class LinkedList<T> {
    private _first: Node<T> | undefined;
    private _last: Node<T> | undefined;
    private _size: number = 0;

    get: ((index: number) => Node<T> | undefined) = (index) => {
        if(this._first && this._size >= index) {
            let temp;
            while(index-- != 0) {
                temp = this._first.next;
            }
            return temp;
        } else {
            console.log("Check: size not zero, index smaller than size")
            return undefined;
        }
    }
    addFirst: ((value: T) => void) = (value) => {
        const newNode = new Node(value);

        if(this._first) {
            newNode.next = this._first;
            this._size++;
        } else {
            this._first = newNode;
            this._last = newNode;
            this._size++;
        }
    }
    addLast: ((value: T) => void) = (value) => {
        const newNode = new Node(value);

        if(this._last) {
            this._last.next = newNode;
            this._size++;
        } else {
            this._first = newNode;
            this._last = newNode;
            this._size++;
        }
    }
    add: ((index: number, value: T) => void) = (index, value) => {
        if(index == 0 || !this._first) {
            this.addFirst(value);
        } else {
            const newNode = new Node(value);
            const temp1 = this.get(index-1);
            const temp2 = temp1 && temp1.next;
            temp1 && (temp1.next = newNode);
            newNode.next = temp2;

            if(!newNode.next) {
                
            }

            this._size++;
        }
    }
    getIterator: ((head: Node<T>) => ListIterator<T>) = () => {
        return new ListIterator(this._first);
    }
}

class Node<T> {
    private _data: T;
    private _next: Node<T> | undefined;

    constructor(value: T) {
        this._data = value;
    }

    get data() {
        return this._data;
    }
    get next() {
        return this._next;
    }
    set data(data: T) {
        this._data = data;
    }
    set next(next: Node<T> | undefined) {
        this._next = next;
    }
    public toString() {
        return this._data.toString();
    }
}

class ListIterator<T> {
    private _currentData: T | undefined;
    private _next: Node<T> | undefined;
    private _nextIndex: number;

    constructor(first: Node<T> | undefined) {
        this._next = first;
        this._nextIndex = 0;
    }

    next: (() => T | undefined) = () => {
        
        return this._currentData;
    }
    hasNext: (() => boolean) = () => {

        return true;
    }
}
