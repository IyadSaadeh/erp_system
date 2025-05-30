$(document).ready(function () {
    LoadAccTransactionDataTable(false, 0);
});


var LoadAccTransactionDataTable = function (_IsFilterData, _AccAccountId) {
    document.title = 'Account Transaction  Report';

    $("#tblAccTransaction").DataTable({
        paging: true,
        select: true,
        "order": [[0, "desc"]],
        dom: 'Bfrtip',


        buttons: [
            'pageLength',
            {
                extend: 'collection',
                text: 'Export',
                buttons: [
                    {
                        extend: 'pdfHtml5',
                        customize: function (doc) {
                            //doc.content[1].margin = [100, 0, 100, 0];
                            //Remove the title created by datatTables
                            doc.content.splice(0, 1);
                            //Create a date string that we use in the footer. Format is dd-mm-yyyy
                            var now = new Date();
                            var jsDate = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear();

                            doc.pageMargins = [20, 60, 20, 30];
                            // Set the font size fot the entire document
                            doc.defaultStyle.fontSize = 7;
                            // Set the fontsize for the table header
                            doc.styles.tableHeader.fontSize = 10;


                            doc['header'] = (function () {
                                return {
                                    columns: [
                                        {
                                            alignment: 'left',  //center
                                            italics: true,
                                            text: 'Account Transaction  Report',
                                            fontSize: 18,
                                            margin: [0, 0]
                                        }
                                    ],
                                    margin: 20
                                }
                            });

                            // Create a footer object with 2 columns
                            doc['footer'] = (function (page, pages) {
                                return {
                                    columns: [
                                        {
                                            alignment: 'left',
                                            text: ['Created on: ', { text: jsDate.toString() }]
                                        },
                                        {
                                            alignment: 'right',
                                            text: ['page ', { text: page.toString() }, ' of ', { text: pages.toString() }]
                                        }
                                    ],
                                    margin: 5
                                }
                            });
                            // Change dataTable layout (Table styling)
                            // To use predefined layouts uncomment the line below and comment the custom lines below
                            // doc.content[0].layout = 'lightHorizontalLines'; // noBorders , headerLineOnly
                            var objLayout = {};
                            objLayout['hLineWidth'] = function (i) { return .5; };
                            objLayout['vLineWidth'] = function (i) { return .5; };
                            objLayout['hLineColor'] = function (i) { return '#aaa'; };
                            objLayout['vLineColor'] = function (i) { return '#aaa'; };
                            objLayout['paddingLeft'] = function (i) { return 4; };
                            objLayout['paddingRight'] = function (i) { return 4; };
                            doc.content[0].layout = objLayout;
                        },


                        orientation: 'portrait', // landscape
                        pageSize: 'A4',
                        pageMargins: [0, 0, 0, 0], // try #1 setting margins
                        margin: [0, 0, 0, 0], // try #2 setting margins
                        text: '<u>PDF</u>',
                        key: { // press E for export PDF
                            key: 'e',
                            altKey: false
                        },
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5, 6, 7], //column id visible in PDF
                            modifier: {
                                // DataTables core
                                order: 'index',  // 'current', 'applied', 'index',  'original'
                                page: 'all',      // 'all',     'current'
                                search: 'none'     // 'none',    'applied', 'removed'
                            }
                        }
                    },
                    'copyHtml5',
                    'excelHtml5',
                    /*'csvHtml5',*/
                    {
                        extend: 'csvHtml5',
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5, 6, 7],
                            page: 'all'
                        }
                    },
                    {
                        extend: 'print',
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5, 6, 7],
                            page: 'all'
                        }
                    }
                ]
            }
        ],

        "processing": true,
        "language": { "processing": "<i class='fa fa-spinner fa-spin' style='font-size:30px; color:green;'></i>" },
        "serverSide": true,
        "serverSide": true,
        "filter": true, //Search Box
        "orderMulti": false,
        "stateSave": true,

        "ajax": {
            "url": "/AccTransaction/GetDataTabelData?IsFilterData=" + _IsFilterData + "&AccAccountId= " + _AccAccountId,
            "type": "POST",
            "datatype": "json"
        },


        "columns": [
            {
                data: "Id", "name": "Id", render: function (data, type, row) {
                    return "<a href='#' class='fa fa-eye' onclick=Details('" + row.Id + "');>" + row.Id + "</a>";
                }
            },
            { "data": "AccountDisplay", "name": "AccountDisplay" },
            { "data": "Type", "name": "Type" },
            { "data": "Reference", "name": "Reference" },
            { "data": "Credit", "name": "Credit" },
            { "data": "Debit", "name": "Debit" },
            { "data": "Amount", "name": "Amount" },

            {
                data: null, render: function (data, type, row) {
                    return ConvertDateToMMDDYYYY(row.CreatedDate);
                }
            }
        ],

        "lengthMenu": [[20, 10, 15, 25, 50, 100, 200], [20, 10, 15, 25, 50, 100, 200]]
    });
}
