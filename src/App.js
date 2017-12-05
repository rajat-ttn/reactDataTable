import React, { Component } from 'react';
import logo from './assets/motusLogo.jpeg';
import Table from './components/Table';
import './App.css';



class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Data Table</h1>
        </header>
        <p className="App-intro">
        </p>
        <Table></Table>
      </div>
    );
  }
}

export default App;
