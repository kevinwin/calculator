import React, { Component } from 'react';
import Calculator from './Calculator';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    total: 0,
  }

  render() {
    const { total } = this.state;
    return (
      <div className="App">
          <Calculator total={total}/>
      </div>
    );
  }
}

export default App;
