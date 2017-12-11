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

    /**
     * Destroy the datatable
     */
    componentWillUnmount(){
        $('.data-table-wrapper')
            .find('table')
            .DataTable()
            .destroy(true);
    }

    /**
     * Stop rendering the component
     * @param nextProps
     * @returns {boolean}
     */
    shouldComponentUpdate(nextProps) {
        return false;
    }

    render() {
        return (
            <div style={{width:'90%', margin:'0 auto'}}>
                <table ref="main" className="hover row-border">
                </table>
            </div>);
    }
}

export default Table;