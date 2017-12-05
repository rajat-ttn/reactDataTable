import React, { Component } from 'react';

import '../../node_modules/datatables.net-dt/css/jquery.dataTables.css';

const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );

const data  = require('../data/tableData.json')['gps_vs_manual'];

const columns = [
    {
        title: 'Period Id',
        width: 120,
        data: 'periodid'
    },
    {
        title: 'First Name',
        width: 180,
        data: 'firstname'
    },
    {
        title: 'GPS Count',
        width: 180,
        data: 'gpscount'
    },
    {
        title: 'Total',
        width: 180,
        data: 'total'
    },
    {
        title: 'Program Name',
        width: 180,
        data: 'programname'
    },
    {
        title: 'Client Employee Id',
        width: 180,
        data: 'clientemployeeid'
    },
    {
        title: 'Period Name',
        width: 180,
        data: 'periodname'
    },
    {
        title: 'Person Id',
        width: 180,
        data: 'personid'
    },
    {
        title: 'Manual Count',
        width: 180,
        data: 'manualcount'
    },
    {
        title: 'Program Id',
        width: 180,
        data: 'programid'
    },
    {
        title: 'Last Name',
        width: 180,
        data: 'lastname'
    },
    {
        title: 'User Name',
        width: 180,
        data: 'username'
    }
];

class Table extends Component {
    componentDidMount() {
        $(this.refs.main).DataTable({
            data: data,
            columns,
            "scrollX": true
        });
    }
    componentWillUnmount(){
        $('.data-table-wrapper')
            .find('table')
            .DataTable()
            .destroy(true);
    }
    shouldComponentUpdate() {
        return false;
    }
    render() {
        return (
            <div style={{width:'90%', margin:'0 auto'}}>
                <table ref="main" className="display cell-border">
                </table>
            </div>);
    }
}

export default Table;