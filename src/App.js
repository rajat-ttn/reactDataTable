import React, { Component } from 'react';
import logo from './assets/logo.png';
import Table from './components/DataTable/dataTable';
import NavBar from './components/NavBar/navBar';
import './assets/fonts/fonts.css';
import './App.css';

//Import table config and data
import { DT_CONFIG } from './config/data-table-config';
const data  = require('./data/tableData.json')['gps_vs_manual'];

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

        <Table
         tableConfig={DT_CONFIG}
         tableData={data}
         toggleRow={[{key: 'firstname', title:'First Name'},{key:'lastname', title:'Last Name:'}]}
        />
      </div>
    );
  }
}

export default App;
