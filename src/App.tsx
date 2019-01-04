import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LinkedList from './lib/LinkedList';
import LinkedStack from './lib/LinkedStack';
import LinkedQueue from './lib/LinkedQueue';
import DoubleLinkedList from './lib/DoubleLinkedList';

const linkedListTest = () => {
  console.log("**************************LinkedList**************************");
  const list = new LinkedList<string>('슈프림', '발렌시아가', '스투시', '마르지엘라', '코스');

  console.log(list);
  console.log(list.get(0));
  list.remove(1);
  console.log(list);
  console.log('--------------------------------------------------------');

  //list.removeLast();
  console.log(list.indexOf('코스'));
  console.log(list);
  console.log(list.get(4));

  console.log('--------------------------------------------------------');

  list.add(10, '오프화이트');
  console.log(list.get(1).toString());
  console.log(list.toString());

  console.log('--------------------------------------------------------');
  const iterator = list.getIterator();
  while(iterator.hasNext()) {
    const data = iterator.next();
    console.log(data);

    if(data === '슈프림') {
      iterator.add('프라다');
    }
    if(data === '스투시') {
      iterator.remove();
    }
    if(data === '코스') {
      iterator.remove();
    }
  }
  console.log(list.toString())
  
  console.log('--------------------------------------------------------');

  console.log(iterator.next());
  console.log(list.toString());
}

const linkedStackTest = () => {
  console.log("**************************Stack**************************");
    const stack = new LinkedStack();
    stack.push("패션인테크");
    stack.push("구글");
    stack.push("카카오");
    stack.push("네이버");
    stack.push("NHN");
    stack.push("패션인테크");
    
    console.log(stack.search('NHN'));
    console.log(stack.pop());
    console.log(stack.pop());
    console.log(stack.pop());
    console.log(stack.search('NHN'));

    console.log('--------------------------------------------------------');

    stack.push("애플");
    console.log(stack.peek());

    console.log('--------------------------------------------------------');

    while(!stack.empty()) {
      console.log(stack.pop());
    }
    console.log(stack.empty());
    
    console.log('--------------------------------------------------------');

    stack.pop();
    stack.peek();
}

const linkedQueueTest = () => {
  console.log("**************************Queue**************************");
  const queue = new LinkedQueue();
  queue.enqueue("패션인테크");
  queue.enqueue("구글");
  queue.enqueue("카카오");
  queue.enqueue("네이버");
  queue.enqueue("NHN");
  queue.enqueue("패션인테크");
  
  console.log(queue);
  console.log(queue.peek());
  

  console.log('--------------------------------------------------------');

  
  while(!queue.empty()) {
    console.log(queue.dequeue());
  }
}

const doubleLinkedListTest = () => {
  const dList = new DoubleLinkedList('슈프림', '발렌시아가', '스투시', '마르지엘라', '코스');
  console.log(dList);
  const iterator = dList.getIterator();
  while(iterator.hasNext()) {
    const data = iterator.next();
    console.log(data);
    
    if(data === '슈프림') {
      iterator.add('댕댕이');
    }
    if(data === '스투시') {
      iterator.add('고양이');
      iterator.remove();
    }
    if(data === '마르지엘라') {
      iterator.remove();
    }
  }
  console.log(dList.toString());
  console.log('****************반대로****************');
  while(iterator.hasPrev()) {
    console.log(iterator.prev());
  }
  console.log('****************정방향****************');
  while(iterator.hasNext()) {
    console.log(iterator.next());
  }
}

class App extends Component {
  render() {
     //linkedListTest();
    // linkedStackTest();
    // linkedQueueTest();
    doubleLinkedListTest();

    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
