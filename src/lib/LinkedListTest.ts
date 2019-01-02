export class LinkedListTest<T> {
    private _first: Node<T>;
    private _last: Node<T>;
    private _size: number;

    constructor(...datas: T[]) {
        if(!datas) {
            this._first = undefined;
            this._last = undefined;
        } else {
            datas.map((data, index) => {
                this.addLast(data);
            });
        }
        this._size = 0;
    }

    get: ((index: number) => Node<T>) = (index) => {
        if(this._first && this._size >= index) {
            let temp;
            while(index-- != 0) {
                temp = this._first.next;
            }
            return temp;
        } else {
            console.log("Check: size not zero, index smaller than size");
            return undefined;
        }
    }
    addFirst: ((data: T) => void) = (data) => {
        const newNode = new Node(data);

        if(this._first) {
            newNode.next = this._first;
            this._first = newNode;
            this._size++;
        } else {
            this._first = newNode;
            this._last = newNode;
            this._size++;
        }
    }
    addLast: ((data: T) => void) = (data) => {
        const newNode = new Node(data);

        if(this._last) {
            this._last.next = newNode;
            this._last = newNode;
            this._size++;
        } else {
            this._first = newNode;
            this._last = newNode;
            this._size++;
        }
    }
    add: ((index: number, data: T) => void) = (index, data) => {
        if(index == 0 || !this._first) {
            this.addFirst(data);
        } else {
            const newNode = new Node(data);
            const temp1 = this.get(index-1);
            const temp2 = temp1.next;
            temp1.next = newNode;
            newNode.next = temp2;

            if(!newNode.next) {
                this._last = newNode;
            }

            this._size++;
        }
    }
    removeFirst: (() => T) = () => {
        let removedNode = this._first;
        const removedData = removedNode.data;
        this._first = removedNode.next;
        this._size--;
        removedNode = undefined;

        return removedData;
    }
    removeLast: (() => T) = () => {
        return this.remove(this._size-1);
    }
    remove: ((index: number) => T) = (index) => {
        if(index == 0) {
            return this.removeFirst();
        }

        const temp1 = this.get(index-1);
        let removedNode = temp1.next;
        const temp2 = temp1.next.next;
        const removedData = removedNode.data;

        temp1.next = temp2;
        removedNode = undefined;
        this._size--;

        if(index == this._size-1) {
            this._last == temp1;
        }

        return removedData;
    }
    indexOf: ((data: T) => number) = (data) => {
        let currentNode = this._first;
        let index = 0;

        while(currentNode.data != data) {
            currentNode = currentNode.next;
            index++;
            
            if(!currentNode) {
                return -1;
            }
        }

        return index;
    }
    getIterator: (() => ListIterator<T>) = () => {
        return new ListIterator(this._first);
    }
    toString: (() => string) = () => {
        let currentNode = this._first;
        let index = 0;
        let result = "[";

        while(currentNode) {
            result += `${index}:${currentNode.data}, `;

            currentNode = currentNode.next;
            index++;
        }

        result = result.substring(0, result.length-2);
        result += "]";
        return '';
    }
}

class Node<T> {
    private _data: T;
    private _next: Node<T>;

    constructor(data: T) {
        this._data = data;
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
    set next(next: Node<T>) {
        this._next = next;
    }
    public toString() {
        return this._data.toString();
    }
}

class ListIterator<T> {
    private _currentData: T;
    private _next: Node<T>;

    constructor(first: Node<T>) {
        this._next = first;
    }

    next: (() => T) = () => {
        const currentNode = this._next;
        this._currentData = currentNode.data;
        this._next = currentNode.next;

        return this._currentData;
    }
    hasNext: (() => boolean) = () => {
        if(this._next) return true;
        else return false;
    }
}
