


export interface Iterable<T> {
    getIterator(): Iterator<T>;
}

export interface Iterator<T> {
    next(): T;
    hasNext(): boolean;
    prev?(): T;
    hasPrev?(): boolean;
    add?(data: T): void;
    remove?(): void;
}
