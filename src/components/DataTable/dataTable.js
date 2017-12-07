import React, { Component } from 'react';
import $ from 'jquery';
import '../../config/data-table-utils';
import { DT_CONFIG } from '../../config/data-table-config';
const data  = require('../../data/tableData.json')['gps_vs_manual'];

data.map(function(item, index){
   item.index  = index;
   return item;
});

class Table extends Component {

    componentDidMount() {
        let dataTable = $(this.refs.main).DataTable(DT_CONFIG(data));

        // Add event listener for opening and closing details
        $(this.refs.main).on('click', 'td.details-control', function () {
            var tr = $(this).closest('tr');
            var row = dataTable.row( tr );

            if ( row.child.isShown() ) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
            }
            else {
                // Open this row
                row.child( format(row.data()) ).show();
                tr.addClass('shown');
            }
        } );

        /* Formatting function for row details - modify as you need */
        function format ( d ) {
            // `d` is the original data object for the row
            return `
                <table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">
                    <tr>
                    <td>First Name:</td>
                    <td>${d.firstname}</td>
                    </tr>
                    <tr>
                    <td>Last Name:</td>
                    <td>${d.lastname}</td>
                    </tr>
                </table>
            `;
        }
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
                {/*<button ref="addRow">Add New Row</button>*/}
                {/*<button ref="replaceData">Replace Data</button>*/}
                <table ref="main" className="hover row-border">
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