export default class DoubleLinkedList<T> {
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
        let forward;  // true: forward,  false: backward
        let temp;
        
        if(index >= this._size / 2) {
            forward = false;
            temp = this._last;
        } else {
            forward = true;
            temp = this._first;
        }

        if(this._size > 0 && this._size > index && index >= 0) {
            let count = forward ? index : this._size - index - 1;
            while(count-- != 0) {
                temp = forward ? temp.next : temp.prev;
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
            this._first.prev = newNode;
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
            newNode.prev = this._last;
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
        } else if(index == this._size) {
            this.addLast(data);
        } else {
            const newNode = new Node(data);
            const temp1 = this.get(index-1);
            const temp2 = temp1.next;
            
            temp1.next = newNode;
            newNode.prev = temp1;
            newNode.next = temp2;
            temp2.prev = newNode;
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
        const removedData = removedNode.clone();
        //console.log('리무브 클론 데이터: ' + removedData);
        // const removedData = removedNode.data;
        this._first = removedNode.next;
        this._first.prev = null;
        this._size--;
        removedNode = null;

        return removedData;
    }
    removeLast: (() => T) = () => {
        if(this._size == 0) {
            this.error('remove');
            return;
        }

        let removedNode = this._last;
        const removedData = removedNode.data;

        this._last = removedNode.prev;
        this._last.next = null;
        this._size--;
        removedNode = null;

        return removedData;
    }
    remove: ((index: number) => T) = (index) => {
        if(this._size == 0 || index < 0 || index > this._size-1) {
            this.error('remove');
            return;
        } else if(this._size == 1) {
            this._first = null;
            this._last = null;
            this._size--;
            return;
        }

        if(index == 0) {
            return this.removeFirst();
        } else if(index == this._size-1) {
            return this.removeLast();
        }

        let removedNode = this.get(index);
        const temp1 = removedNode.prev;
        const temp2 = removedNode.next;
        const removedData = removedNode.data;

        temp1.next = temp2;
        temp2.prev = temp1;
        removedNode = null;
        this._size--;

        return removedData;
    }
    indexOf(data: T): number {
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
    lastIndexOf(data: T): number {
        let currentNode = this._first;
        let index = this._size-1;

        while(currentNode.data != data) {
            currentNode = currentNode.prev;
            index--;
            
            if(!currentNode) {
                return -1;
            }
        }

        return index;
    }
    size(): number {
        return this._size;
    }
    getIterator: (() => ListIterator<T>) = () => {
        return new ListIterator(this, this._first, this._last);
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
                console.error("Error! LinkedList.remove(): \n\t maybe list size=0");
                break;
            case 'add':
                console.error("Error! LinkedList.add(): \n\t\t 1.input must smaller than list size. \n\t\t 2.input must not negative.")
                break;
            case 'get':
                console.error("Error! LinkedList.get(): \n\t\t 1.maybe list size=0 \n\t\t 2.input must smaller than list size. \n\t\t 3.input not negative");
                break;
        }
    }
}

export class Node<T> {
    private _data: T;
    private _next: Node<T>;
    private _prev: Node<T>;

    constructor(data: T) {
        this._data = data;
    }

    get data() {
        return this._data;
    }
    get next() {
        return this._next;
    }
    get prev() {
        return this._prev;
    }
    set data(data: T) {
        this._data = data;
    }
    set next(next: Node<T>) {
        this._next = next;
    }
    set prev(prev: Node<T>) {
        this._prev = prev;
    }
    public toString() {
        return this._data.toString();
    }
    public clone() {
        let cloneObject = [this._data].slice(0)[0];
        
        return cloneObject;
    }
}

class ListIterator<T> {
    private _currentNode: Node<T>;
    private _lastData: T;
    private _lastIndex: number;
    private _lastNode: Node<T>;
    private _currentList: DoubleLinkedList<T>;
    private _direction: string;
    private _size: number;

    constructor(list: DoubleLinkedList<T>, first: Node<T>, last: Node<T>) {
        this._currentList = list;
        this._currentNode = first;
        this._lastNode = last;
        this._lastIndex = -1;
        this._size = list.size();
    }

    next(): T {
        if(!this._currentNode) {
            this.error('next');
            return;
        }

        this._lastData = this._currentNode.data;    
        this._currentNode = this._currentNode.next; 
        this._lastIndex++;         
        this._direction = 'next';                 

        return this._lastData;                   
    }
    prev(): T {
        if(this._lastIndex < 0) {
            this.error('prev');
            return;
        }
        if(this._lastIndex+1 == this._size) {
            this._currentNode = this._lastNode;
        } else {
            this._currentNode = this._currentNode.prev; 
        }
        this._lastData = this._currentNode.data;
        this._lastIndex--;
        this._direction = 'prev';
        console.log(this._lastIndex);

        return this._lastData;
    }
    hasNext(): boolean {
        if(this._currentNode) return true;
        else return false;
    }
    hasPrev(): boolean {
        console.log(`프레브 ${this._lastIndex}`)
        if(this._lastIndex >= 0) return true;
        else return false;
    }
    add(data: T): void {
        const addIndex = this._direction === 'next' ? this._lastIndex : this._lastIndex+1;
        this._currentList.add(addIndex, data);
        this._size++;
        if(this._direction === 'next') {
            this._lastIndex++;
        } else {
            this._currentNode = this._currentNode.prev;
        }
    }
    remove(): void {
        const removeIndex = this._direction === 'next' ? this._lastIndex : this._lastIndex+1;
        this._currentList.remove(removeIndex);
        this._size--;
        if(this._direction === 'next') {
            this._lastIndex--;
        }
   } 
    private error(type: string): any {
        switch(type) {
            case 'next':
            console.error("Error! ListIterator.next(): \n\t\t 1.maybe list size=0 \n\t\t 2.next node does not exist anymore.");
                break;
            case 'prev':
            console.error("Error! ListIterator.prev(): \n\t\t 1.maybe list size=0 \n\t\t 2.prev node does not exist anymore.");
            break;
        }
    }
}
