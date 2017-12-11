const columns = [
        {
            "className":      'details-control',
            "orderable":      false,
            "data":           null,
            "defaultContent": ''
        },
        {
            title: 'Index',
            data: 'index'
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
                columns: ':gt(0)'
            },
            'copy', 'excel', 'pdf', 'csv', 'print'
        ],
        data: data,
        columns,
        "scrollX": true,
        fixedHeader: false,
        // rowReorder: {
        //     dataSrc: 'index'
        // }
    }
};