import { Node } from "./LinkedList";

export default class Queue<T> {
    private _size: number;
    private _first: Node<T>;
    private _last: Node<T>;

    constructor() {
        this._size = 0;
    }

    enqueue: ((data: T) => T) = (data) => {
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
    dequeue: (() => T) = () => {
        if(!this._first) {
            this.error('dequeue');
            return;    
        }

        let removeNode = this._first;
        const newFirst = this._first.next;
        const removedData = this._first.data;
        
        this._first = newFirst;
        removeNode = undefined;
        this._size--;

        return removedData;
    }
    peek: (() => T) = () => {
        if(!this._first) {
            this.error('peek');
            return;
        }

        return this._first.data;
    }
    empty: (() => boolean) = () => {
        if(this._first)
            return false;

        return true;
    }
    private error: ((type: string) => any) = (type) => {
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