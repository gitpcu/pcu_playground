import { Iterable, Iterator } from './Iterator';


export default class ArrayStack<T> implements Iterable<T> {
    private _array: T[];
    private _top: number;
    private _size: number;
    private _emptyIndex: number;

    constructor(size: number) {
        this._size = size;
        this._array = new Array<T>(size);
        this._top = size;
    }

    push(data: T) {
        if(this._top <= 0) {
            this.error('push');
            return;
        }

        this._top--;
        this._array[this._top] = data;

        // const emptyIndex = this.empty();
        
        // if(emptyIndex == -1) {
        //     this.error('push');
        //     return;
        // }

        // this._array[emptyIndex] = data;
        // this._top--;
    }
    pop(): T {
        if(this._top==this._size) {
            this.error('pop');
            return;
        }

        const removedData = this._array[this._top];
        this._array[this._top] = null;
        this._top++;
        
        return removedData;
    }
    peek(): T {
        if(this._top==this._size) {
            this.error('peek');
            return;
        }

        return this._array[this._top];
    }
    empty(): number {
        let emptyIndex = -1;

        for(let i=this._size-1; i>=0; i--) {
            if(!this._array[i]) {
                emptyIndex = i;
                return emptyIndex;
            }
        }
        
        return emptyIndex;
    }
    search(data: T): number{
        return this._array.lastIndexOf(data);
    }
    toString(): string {
        return `in,out-> [${this._array.toString()}]`;
    }
    getIterator() {
        if(this._top==this._size) {
            this.error('getIterator');
            return;
        }

        return new StackIterator<T>(this, this._array, this._top);
    }
    private error(type: string): any {
        switch(type) {
            case 'push':
                console.error("Error! ArrayStack.push(): \n\t\t Stack overflow.");
                break;
            case 'pop':
                console.error("Error! ArrayStack.pop(): \n\t\t maybe Stack size=0");
                break;
            case 'peek':
                console.error("Error! ArrayStack.peek(): \n\t\t maybe Stack size=0");
                break;
            case 'getIterator':
                console.error("Error! ArrayStack.getIterator(): \n\t\t maybe Stack size=0");
                break;
        }
    }
}

class StackIterator<T> implements Iterator<T> {
    private _currentArray: T[];
    private _next: number;

    constructor(stack: ArrayStack<T>, array: T[], first: number) {
        this._currentArray = array;
        this._next = first;
    }

    next(): T {
        if(this._next >= this._currentArray.length) {
            this.error('next');
            return;
        }

        const currentData = this._currentArray[this._next];
        this._next++;

        return currentData;
    }
    hasNext(): boolean {
        if(this._currentArray[this._next]) {
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