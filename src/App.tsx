import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { LinkedList } from './lib/LinkedList';
import { LinkedListTest } from './lib/LinkedListTest';



class App extends Component {
  render() {
    const list2 = new LinkedList<number>();
    list2.removeFirst();

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
    console.log('--------------------------------------------------------');

    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
