import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { LinkedList } from './lib/LinkedList';
import { LinkedListTest } from './lib/LinkedListTest';



class App extends Component {
  render() {
    const list = new LinkedList<number>(1, 2, 3);
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
