import React, { Component } from 'react';
import logo from './assets/Customer_MRR.png';
import Table from './components/Table';
import NavBar from './components/NavBar/navBar';
import './assets/fonts/fonts.css';
import './App.css';



class App extends Component {
  render() {
    return (
      <div className="container">
        <header className="container-header">
            <div className="container-header-logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="container-header-nav">
               <NavBar></NavBar>
            </div>
        </header>
        <p className="container-intro">
        </p>
        <Table></Table>
      </div>
    );
  }
}

export default App;
