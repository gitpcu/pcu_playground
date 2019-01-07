import { Node } from "./LinkedList";
import { Iterable, Iterator } from './Iterator'; 

export default class LinkedStack<T> implements Iterable<T> {
    private _size: number;
    private _top: Node<T>;

    constructor() {
        this._size = 0;        
    }

    push(data: T): T {
        const newNode = new Node(data);
        
        if(this._top) {
            newNode.next = this._top;
        }
        this._top = newNode;
        this._size++;

        return newNode.data;
    }
    pop(): T {
        if(!this._top) {
            this.error('pop');
            return;
        }

        let popNode = this._top;
        const popNodeData = popNode.data;

        if(popNode.next) {
            this._top = popNode.next;
        } else {
            this._top = null;
        }
        popNode && this._size--;
        popNode = null;

        return popNodeData;
    }
    peek(): T {
        if(!this._top) {
            this.error('peek');
            return;
        }

        return this._top.data;
    }
    empty: (() => boolean) = () => {
        if(this._top)
            return false;

        return true;
    }
    search(searchdata: T): number {
        let currentNode = this._top;
        let currentIndex = 0;

        while(currentNode) {
            if(currentNode.data === searchdata) {
                return currentIndex;
            }
            currentNode = currentNode.next;
            currentIndex++;
        }

        return -1;
    }
    getIterator() {
        return new StackIterator(this._top);
    }
    private error(type: string): any {
        switch(type) {
            case 'pop':
                console.error("Error! Stack.pop(): maybe Stack is empty.");
                break;
            case 'peek':
                console.error("Error! Stack.peek(): maybe Stack is empty.")
                break;
        }
    }
}

class StackIterator<T> implements Iterator<T> {
    private _currentNode: Node<T>
    private _lastData: T;
    private _lastIndex: number;

    constructor(first: Node<T>) {
        this._currentNode = first;
        this._lastIndex = -1;
    }    
    
    next() {
        if(!this._currentNode) {
            this.error('next');
            return;
        }

        this._lastData = this._currentNode.data;
        this._lastIndex++;
        this._currentNode = this._currentNode.next;

        return this._lastData;
    }
    hasNext() {
        if(this._currentNode) {
            return true;
        }
        return false;
    }
    private error(type: string): any {
        switch(type) {
            case 'next':
                console.error("Error! StackIterator.next(): \n\t\t 1.maybe Stack size=0 \n\t\t 2.next Stack does not exist anymore.");
                break;
        }
    }
}