import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LinkedList from './lib/LinkedList';
import Stack from './lib/Stack';
import Queue from './lib/Queue';

class App extends Component {
  render() {
    console.log("**************************LinkedList**************************");
    const list = new LinkedList<string>('슈프림', '발렌시아가', '스투시', '마르지엘라', '코스');
    console.log(list);
    console.log(list.get(4));

    console.log('--------------------------------------------------------');

    list.removeLast();
    console.log(list.indexOf('코스'));
    console.log(list);
    console.log(list.get(4));

    console.log('--------------------------------------------------------');

    list.add(1, '오프화이트');
    console.log(list.get(1).toString());
    console.log(list.toString());

    console.log('--------------------------------------------------------');

    const iterator = list.getIterator();
    while(iterator.hasNext()) {
      const data = iterator.next();
      console.log(data);

      if(data === '스투시') {
        iterator.add('프라다');
      }
      if(data === '슈프림') {
        iterator.remove();
      }
    }

    console.log('--------------------------------------------------------');

    console.log(iterator.next());
    console.log(list.toString());


    console.log("**************************Stack**************************");
    const stack = new Stack();
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


    console.log("**************************Queue**************************");
    const queue = new Queue();
    queue.enqueue("패션인테크");
    queue.enqueue("구글");
    queue.enqueue("카카오");
    queue.enqueue("네이버");
    queue.enqueue("NHN");
    queue.enqueue("패션인테크");

    while(!queue.empty()) {
      console.log(queue.dequeue());
    }

    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
