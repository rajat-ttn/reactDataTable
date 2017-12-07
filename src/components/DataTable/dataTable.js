import React, { Component } from 'react';

// import datatable CSS
import '../../../node_modules/datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-buttons-dt/css/buttons.dataTables.css';
import 'datatables.net-fixedheader-dt/css/fixedHeader.dataTables.css';
import 'datatables.net-rowreorder-dt/css/rowReorder.dataTables.css';

//Import custom CSS
import './dataTable.css';

// import datatable dependencies
import $ from 'jquery';
import 'jszip';
import 'pdfmake/build/pdfmake'; // required for generating pdf
import 'pdfmake/build/vfs_fonts'; // required for generating pdf


// import datatable
import 'datatables.net';

// import datatable buttons
import 'datatables.net-buttons';

// import datatable buttons - column visibility
import 'datatables.net-buttons/js/buttons.colVis.js';
//import 'datatables.net-buttons/js/buttons.flash.js';

//Copy to clipboard and create Excel, PDF and CSV files from the table's data.
import 'datatables.net-buttons/js/buttons.html5.js';

//Button that will display a printable view of the table.
import 'datatables.net-buttons/js/buttons.print.js';

//Sticky header and / or footer for the table.
import 'datatables.net-fixedheader';

//Click-and-drag reordering of rows.
import 'datatables.net-rowreorder';


const data  = require('../../data/tableData.json')['gps_vs_manual'];

data.map(function(item, index){
   item.index  = index;
   return item;
});

const columns = [
    {
        "className":      'details-control',
        "orderable":      false,
        "data":           null,
        "defaultContent": ''
    },
    {
        title: 'Index',
        width: 25,
        data: 'index'
    },
    {
        title: 'Period Id',
        width: 100,
        data: 'periodid'
    },
    {
        title: 'First Name',
        width: 130,
        data: 'firstname'
    },
    {
        title: 'GPS Count',
        width: 100,
        data: 'gpscount'
    },
    {
        title: 'Total',
        width: 80,
        data: 'total'
    },
    {
        title: 'Period Name',
        width: 130,
        data: 'periodname'
    },
    {
        title: 'Person Id',
        width: 120,
        data: 'personid'
    },
    {
        title: 'Manual Count',
        width: 130,
        data: 'manualcount'
    },
    {
        title: 'Program Id',
        width: 120,
        data: 'programid'
    },
    {
        title: 'Last Name',
        width: 120,
        data: 'lastname'
    },
    {
        title: 'Program Name',
        width: 180,
        data: 'programname'
    },
    {
        title: 'User Name',
        width: 120,
        data: 'username'
    },
    {
        title: 'Client Employee Id',
        width: 180,
        data: 'clientemployeeid'
    },
];

const dtConfig = {
    dom: 'Blfrtip',
    buttons: [
        'colvis',  'copy', 'excel', 'pdf', 'csv', 'print'
    ],
    data: data,
    columns,
    "scrollX": true,
    fixedHeader:false,
    // rowReorder: {
    //     dataSrc: 'index'
    // }
}

class Table extends Component {
    componentDidMount() {
        let dataTable = $(this.refs.main).DataTable(dtConfig);

        // Add event listener for opening and closing details
        $(this.refs.main).on('click', 'td.details-control', function () {
            alert('hi');
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


        // let newData = [{
        //     "periodid": 92689,
        //     "firstname": "Peter",
        //     "gpscount": 0,
        //     "total": 2,
        //     "programname": "Ford Focus-Account Developers",
        //     "clientemployeeid": "ccbb59742dc91f14784bd3a073304b57",
        //     "periodname": "Nov 2017",
        //     "personid": 40139,
        //     "manualcount": 2,
        //     "programid": 1082,
        //     "lastname": "Lyday",
        //     "username": "260495"
        // }];
        // this.addRow(dataTable, newData);
        // this.replaceTable(dataTable, newData);
    }

    // addRow(dataTable, data) {
    //     $(this.refs.addRow).on("click",function () {
    //         dataTable.rows.add(data).draw( false );
    //     });
    // }
    //
    // replaceTable(dataTable, data) {
    //     $(this.refs.replaceData).on("click",function () {
    //         dataTable.clear().rows.add(data).draw( true );
    //     });
    // }

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