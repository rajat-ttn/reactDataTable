import React, { Component } from 'react';
import $ from 'jquery';

class Table extends Component {
    constructor(props){
        super(props);

        this.tableConfig = props.tableConfig;
        this.tableData = props.tableData;
        this.toggle = props.toggleRow;
    }

    componentDidMount() {

        //Table config props should be must
        if(!this.tableConfig){
            return;
        }

        //Re indexing the table data
        this.tableData.map(function(item, index){
            item.index  = index;
            return item;
        });

        //Creating the table with table config and table data
        let dataTable = $(this.refs.main).DataTable(this.tableConfig(this.tableData));

        this.toggle &&  this.tableRowDetailView(dataTable);

        this.searchUI();

    }

    /**
     * Search box UI
     */
    searchUI(){
        $('.dataTables_filter input').attr("placeholder", "Enter search terms here");
    }

    /**
     * Table row Toggle view
     * @param dataTable
     */
    tableRowDetailView(dataTable){

        let toggle = this.toggle;

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
                row.child( format(row.data(), toggle)).show();
                tr.addClass('shown');
            }
        } );

        /* Formatting function for row details - modify as you need */
        function format ( d, toggle ) {

            let table = $(`<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;"></table>`);

            let toggleUI = toggle.map((data, index)=>{
                return `<tr>
                            <td>${data.title} : </td>
                            <td>${d[data.key]}</td>
                        </tr>`;
            });

            table.append(toggleUI);
            return table;

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