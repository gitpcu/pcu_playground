import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {linkedListTest, linkedStackTest, linkedQueueTest, doubleLinkedListTest} from './RunMethods';


class App extends Component {
  render() {
    //linkedListTest();
    linkedStackTest();
    //linkedQueueTest();
    //doubleLinkedListTest();

    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
