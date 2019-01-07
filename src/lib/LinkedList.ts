import { Iterable, Iterator } from './Iterator';

export default class LinkedList<T> implements Iterable<T> {
    private _first: Node<T>;
    private _last: Node<T>;
    private _size: number;

    constructor(...datas: T[]) {
        this._size = 0;
        datas.map((data, index) => {
            this.addLast(data);
        });
    }

    get(index: number): Node<T> {
    let temp = this._first;

        if(this._first && this._size > index && index >= 0) {
            while(index-- != 0) {
                temp = temp.next;
            }
        } else {
            this.error('get');
            return;
        }

        return temp;
    }
    addFirst(data: T): void {
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
    addLast(data: T): void {
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
    add(index: number, data: T): void {
        if(index > this._size-1 || index < 0) {
            this.error('add');
            return;
        }

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
    removeFirst(): T {
        if(this._size == 0) {
            this.error('remove');
            return;
        }

        let removedNode = this._first;
        const removedData = removedNode.data;
        this._first = removedNode.next;
        this._size--;
        removedNode = null;

        return removedData;
    }
    removeLast(): T {
        if(this._size == 0) {
            this.error('remove');
            return;
        }

        return this.remove(this._size-1);
    }
    remove(index: number): T {
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
        }

        const temp1 = this.get(index-1);
        let removedNode = temp1.next;
        const temp2 = temp1.next.next;
        const removedData = removedNode.data;

        temp1.next = temp2;
        removedNode = null;

        if(index == this._size-1) {
            this._last = temp1;
        }
        
        this._size--;

        return removedData;
    }
    indexOf(data: T): number {
        if(this._size == 0) {
            return -1;
        }

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
    getIterator(): ListIterator<T> {
        return new ListIterator(this, this._first);
    }
    toString(): string {
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
    private error(type: string): any {
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
    public clone() {
        let cloneObject = [this._data].slice(0)[0];
        
        return cloneObject;
    }
}

class ListIterator<T> implements Iterator<T> {
    private _next: Node<T>;
    private _lastData: T;
    private _lastIndex: number;
    private _currentList: LinkedList<T>;

    constructor(list: LinkedList<T>, first: Node<T>) {
        this._currentList = list;
        this._next = first;
        this._lastIndex = -1;
    }

    next(): T {
        if(!this._next) {
            this.error('next');
            return;
        }

        this._lastData = this._next.data;
        this._next = this._next.next;
        this._lastIndex++;

        return this._lastData;
    }
    hasNext(): boolean {
        if(this._next) return true;
        else return false;
    }
    add(data: T): void {
        this._currentList.add(this._lastIndex, data);
        this._lastIndex++;
    }
    remove(): void {
        this._currentList.remove(this._lastIndex);
        this._lastIndex--;
    }
    private error(type: string): any {
        switch(type) {
            case 'next':
                console.error("Error! ListIterator.next(): \n\t\t 1.maybe list size=0 \n\t\t 2.next node does not exist anymore.");
                break;
        }
    }
}
