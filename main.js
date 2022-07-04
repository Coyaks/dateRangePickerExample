$(document).ready(function(){

    fetch_data();

    function fetch_data(start_date = '', end_date = '')
    {
        var dataTable = $('#tablaRangos').DataTable({
            "processing" : true,
            "serverSide" : true,
            "order" : [],
            "ajax" : {
                url:"action.php",
                type:"POST",
                data:{
                    action: 'fetch', 
                    start_date: start_date, 
                    end_date: end_date
                }
            }
        });
    }

    $('#daterange_textbox').daterangepicker({
        ranges:{
            'Hoy' : [moment(), moment()],
            'Ayer' : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Ultimos 7 dias' : [moment().subtract(6, 'days'), moment()],
            'Ultimos 30 dias' : [moment().subtract(29, 'days'), moment()],
            'Ultimos 6 meses' : [moment().subtract('months', 5), moment()],
            'Esta semana'     : [moment().startOf('week'), moment().endOf('week')],
            'La semana pasada': [moment().subtract('week', 1).startOf('week'), moment().subtract('week', 1).endOf('week')],
            'Este mes' : [moment().startOf('month'), moment().endOf('month')],
            'El mes pasado' : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            'Este año'        : [moment().startOf('year'), moment()],
            'El año pasado'   : [moment().subtract('year', 1).startOf('year'), moment().subtract('year', 1).endOf('year')],
            'Todo el tiempo'  : [moment().subtract('year', 20), moment()],
        },
        format : 'YYYY-MM-DD'
    }, function(start, end){

        $('#tablaRangos').DataTable().destroy();

        fetch_data(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));

    });

});