import { Node } from "./LinkedList";

export default class LinkedStack<T> {
    private _size: number;
    private _top: Node<T>;

    constructor() {
        this._size = 0;        
    }

    push: ((data: T) => T) = (data) => {
        const newNode = new Node(data);
        
        if(this._top) {
            newNode.next = this._top;
        }
        this._top = newNode;
        this._size++;

        return newNode.data;
    }
    pop: (() => T) = () => {
        if(!this._top) {
            this.error('pop');
            return;
        }

        let popNode = this._top;
        const popNodeData = popNode.data;

        if(popNode.next) {
            this._top = popNode.next;
        } else {
            this._top = undefined;
        }
        popNode && this._size--;
        popNode = undefined;

        return popNodeData;
    }
    peek: (() => T) = () => {
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
    search: ((searchdata: T) => number) = (searchData) => {
        let currentNode = this._top;
        let currentIndex = 0;

        while(currentNode) {
            if(currentNode.data === searchData) {
                return currentIndex;
            }
            currentNode = currentNode.next;
            currentIndex++;
        }

        return -1;
    }
    private error: ((type: string) => any) = (type) => {
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