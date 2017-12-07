import React, { Component } from 'react';
import $ from 'jquery';
import '../config/data-table-utils';
import { columns } from '../config/data-table-config';

const data  = require('../data/tableData.json')['gps_vs_manual'];

data.map(function(item, index){
   item.index  = index;
   return item;
});

class Table extends Component {
    componentDidMount() {
        let dataTable = $(this.refs.main).DataTable({
            dom: 'Blfrtip',
            buttons: [
                'colvis',  'copy', 'excel', 'pdf', 'csv', 'print'
            ],
            data: data,
            columns,
            "scrollX": true,
            fixedHeader:true,
            rowReorder: {
                dataSrc: 'index'
            }
        });

        let newData = [{
            "periodid": 92689,
            "firstname": "Peter",
            "gpscount": 0,
            "total": 2,
            "programname": "Ford Focus-Account Developers",
            "clientemployeeid": "ccbb59742dc91f14784bd3a073304b57",
            "periodname": "Nov 2017",
            "personid": 40139,
            "manualcount": 2,
            "programid": 1082,
            "lastname": "Lyday",
            "username": "260495"
        }];
        this.addRow(dataTable, newData);
        this.replaceTable(dataTable, newData);
    }

    addRow(dataTable, data) {
        $(this.refs.addRow).on("click",function () {
            dataTable.rows.add(data).draw( false );
        });
    }

    replaceTable(dataTable, data) {
        $(this.refs.replaceData).on("click",function () {
            dataTable.clear().rows.add(data).draw( true );
        });
    }

    componentWillUnmount(){
        $('.data-table-wrapper')
            .find('table')
            .DataTable()
            .destroy(true);
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.names.length !== this.props.names.length) {
            reloadTableData(nextProps.names);
        } else {
            updateTable(nextProps.names);
        }
        return false;
    }

    render() {
        return (
            <div style={{width:'90%', margin:'0 auto'}}>
                <button ref="addRow">Add New Row</button>
                <button ref="replaceData">Replace Data</button>
                <table ref="main" className="display cell-border">
                </table>
            </div>);
    }
}

function updateTable(names) {
    const table = $('.data-table-wrapper')
        .find('table')
        .DataTable();
    let dataChanged = false;
    table.rows().every(function () {
        const oldNameData = this.data();
        const newNameData = names.find((nameData) => {
            return nameData.name === oldNameData.name;
        });
        if (oldNameData.nickname !== newNameData.nickname) {
            dataChanged = true;
            this.data(newNameData);
        }
        return true; // RCA esLint configuration wants us to
                     // return something
    });

    if (dataChanged) {
        table.draw();
    }
}

function reloadTableData(names) {
    const table = $('.data-table-wrapper')
        .find('table')
        .DataTable();
    table.clear();
    table.rows.add(names);
    table.draw();
}

export default Table;