import logo from '../assets/logo.png';
const columns = [
        {
            className: 'details-control',
            orderable: false,
            data: null,
            defaultContent: ''
        },
        {
            title: 'Period Id',
            data: 'periodid'
        },
        {
            title: 'First Name',
            data: 'firstname'
        },
        {
            title: 'GPS Count',
            data: 'gpscount'
        },
        {
            title: 'Total',
            data: 'total'
        },
        {
            title: 'Period Name',
            data: 'periodname'
        },
        {
            title: 'Person Id',
            data: 'personid'
        },
        {
            title: 'Manual Count',
            data: 'manualcount'
        },
        {
            title: 'Program Id',
            data: 'programid'
        },
        {
            title: 'Last Name',
            data: 'lastname'
        },
        {
            title: 'User Name',
            data: 'username'
        },
        {
            title: 'Program Name',
            data: 'programname'
        },
        {
            title: 'Client Employee Id',
            data: 'clientemployeeid'
        }
];

columns.map(function(item, index){
    item.width = item.title && item.title.length * 10;
    return item;
});

export function DT_CONFIG (data) {
    return {
        dom: 'Blfrtip',
        buttons: [
            {
                extend: 'colvis',
                columns: ':gt(0)' // ability to toggle all columns except the first one.
            },
            'copy',
            'excel', //'pdf',
            {
                extend: 'pdfHtml5',
                // only export columns that are visible
                exportOptions:{
                    columns: ':visible'
                },
                customize: function ( doc ) {
                    // Splice the motus logo in after the header, but before the table
                    doc.content.splice( 0, 0, {
                        margin: [ 0, 0, 0, 12 ],
                        alignment: 'center',
                        image: logo
                    } );
                },
                title:null,
                filename:'motus report'
            },
            'csv',
            'print'
        ],
        data: data,
        columns,
        scrollX: true
    }
};