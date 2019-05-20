import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Game from './Game'

class App extends Component {
  render() {
    return (
      <div className="App">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Game} />
            </Switch>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
