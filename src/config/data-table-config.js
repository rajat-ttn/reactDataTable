const columns = [
        {
            "className":      'details-control',
            "orderable":      false,
            "data":           null,
            "defaultContent": ''
        },
        {
            title: 'Index',
            width: 120,
            data: 'index'
        },
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

export function DT_CONFIG (data) {
    return {
        dom: 'Blfrtip',
        buttons: [
            'colvis', 'copy', 'excel', 'pdf', 'csv', 'print'
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