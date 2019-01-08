import { Node } from "./LinkedList";
import { Iterable, Iterator } from './Iterator';

export default class LinkedQueue<T> implements Iterable<T> {
    private _size: number;
    private _first: Node<T>;
    private _last: Node<T>;

    constructor() {
        this._size = 0;
    }

    enqueue(data: T): T {
        const newNode = new Node(data);

        if(this._size == 0) {
            this._first = newNode;
            this._last = newNode;
        } else {
            this._last.next = newNode;
            this._last = newNode;
        }
        this._size++;

        return newNode.data;
    }
    dequeue(): T {
        if(!this._first) {
            this.error('dequeue');
            return;
        }

        let removeNode = this._first;
        const newFirst = this._first.next;
        const removedData = this._first.data;
        
        this._first = newFirst;
        removeNode = null;
        this._size--;

        if(this._size == 0) {
            this._last = null;
        }

        return removedData;
    }
    peek(): T {
        if(!this._first) {
            this.error('peek');
            return;
        }

        return this._first.data;
    }
    empty(): boolean {
        if(this._first)
            return false;

        return true;
    }
    getIterator(): Iterator<T> {
        return new QueueIterator(this._first);
    }
    private error(type: string): any {
        switch(type) {
            case 'dequeue':
                console.error("Error! Queue.dequeue(): maybe Queue is empty.");
                break;
            case 'peek':
                console.error("Error! Queue.peek(): maybe Queue is empty.")
                break;
        }
    }
}

class QueueIterator<T> implements Iterator<T> {
    private _currentNode: Node<T>;
    private _lastData: T;
    private _lastIndex: number;

    constructor(first: Node<T>) {
        this._currentNode = first;
        this._lastIndex = -1;
    }

    next(): T {
        if(!this._currentNode) {
            this.error('next');
            return;
        }

        this._lastData = this._currentNode.data;
        this._lastIndex++;
        this._currentNode = this._currentNode.next;

        return this._lastData;
    }
    hasNext(): boolean {
        if(this._currentNode) {
            return true;
        }
        return false;
    }
    private error(type: string): any {
        switch(type) {
            case 'next':
                console.error("Error! QueueIterator.next(): \n\t\t 1.maybe Queue size=0 \n\t\t 2.next Queue does not exist anymore.");
                break;
        }
    }
}
