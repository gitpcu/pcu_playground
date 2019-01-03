export default class LinkedList<T> {
    private _first: Node<T>;
    private _last: Node<T>;
    private _size: number;

    constructor(...datas: T[]) {
        this._size = 0;
        datas.map((data, index) => {
            this.addLast(data);
        });
    }

    get: ((index: number) => Node<T>) = (index) => {
        let temp = this._first;

        if(this._first && this._size > index) {
            while(index-- != 0) {
                temp = temp.next;
            }
        } else {
            this.error('get');
            return;
        }

        return temp;
    }
    addFirst: ((data: T) => void) = (data) => {
        const newNode = new Node(data);

        if(this._first) {
            newNode.next = this._first;
            this._first = newNode;
        } else {
            this._first = newNode;
            this._last = newNode;
        }

        this._size++;
    }
    addLast: ((data: T) => void) = (data) => {
        const newNode = new Node(data);

        if(this._last) {
            this._last.next = newNode;
            this._last = newNode;
        } else {
            this._first = newNode;
            this._last = newNode;
        }

        this._size++;
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
        if(this._size == 0) {
            this.error('remove');
            return;
        }

        let removedNode = this._first;
        const removedData = removedNode.data;
        this._first = removedNode.next;
        this._size--;
        removedNode = undefined;

        return removedData;
    }
    removeLast: (() => T) = () => {
        if(this._size == 0) {
            this.error('remove');
            return;
        }

        return this.remove(this._size-1);
    }
    remove: ((index: number) => T) = (index) => {
        if(this._size == 0) {
            this.error('remove');
            return;
        }

        if(index == 0) {
            return this.removeFirst();
        }

        const temp1 = this.get(index-1);
        let removedNode = temp1.next;
        const temp2 = temp1.next.next;
        const removedData = removedNode.data;

        this._last = temp2;
        temp1.next = temp2;
        removedNode = undefined;

        if(index == this._size-1) {
            this._last = temp1;
        }
        
        this._size--;

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
        return new ListIterator(this, this._first);
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
        return result;
    }
    private error: ((type: string) => any) = (type) => {
        switch(type) {
            case 'remove':
                console.error("Error! LinkedList.remove(): maybe list size=0");
                break;
            case 'add':
                console.error("Error! LinkedList.add(): maybe input index bigger than list size.")
                break;
            case 'get':
                console.error("Error! LinkedList.get(): 1.maybe list size=0  2.input smaller than size.");
                break;
        }
    }
}

export class Node<T> {
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
    private _next: Node<T>;
    private _lastData: T;
    private _lastIndex: number;
    private _currentList: LinkedList<T>;

    constructor(list: LinkedList<T>, first: Node<T>) {
        this._currentList = list;
        this._next = first;
        this._lastIndex = -1;
    }

    next: (() => T) = () => {
        if(!this._next) {
            this.error('next');
            return;
        }

        this._lastData = this._next.data;
        this._next = this._next.next;
        this._lastIndex++;

        return this._lastData;
    }
    hasNext: (() => boolean) = () => {
        if(this._next) return true;
        else return false;
    }
    add: ((data: T) => void) = (data) => {
        const addIndex = this._currentList.indexOf(this._lastData);
        this._currentList.add(addIndex, data);
    }
    remove: (() => void) = () => {
        const removeIndex = this._currentList.indexOf(this._lastData);
        this._currentList.remove(removeIndex);
    }
    private error: ((type: string) => any) = (type) => {
        switch(type) {
            case 'next':
                console.error("Error! ListIterator.next(): next node does not exist.");
                break;
        }
    }
}
