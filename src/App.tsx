import React, { Component } from 'react';
import './App.css';
import {linkedListTest, linkedStackTest, linkedQueueTest, doubleLinkedListTest, arrayStackTest} from './RunMethods';
import { Route } from 'react-router-dom';
import Nemox2 from './pages/Nemox2';

class App extends Component {
  render() {
    //linkedListTest();
    //linkedStackTest();
    //linkedQueueTest();
    //doubleLinkedListTest();
    //arrayStackTest();
    
    return (
      <div className="App">
        <Nemox2 />
        {/* <Route exact path="/" component={Nemox2} />
        <Route path="/nemox2" component={Nemox2} /> */}
      </div>
    );
  }
}

export default App;
