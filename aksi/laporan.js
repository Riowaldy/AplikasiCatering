var laporan = function () {
    var getDataLaporan = function(){
        var t = $('#laporan').DataTable({
            'ajax': {
                'url': '../../controller/readLaporan.php',
                'dataSrc': ''
            },
            'columns': [
                { 'data': 'id'},
                { 'data': 'pesanan'},
                { 'data': 'pelanggan'},
                { 'data': 'jumlah'},
                { 
                    'data': 'harga', 
                    'render': $.fn.dataTable.render.number( '.', ',', 2, 'Rp' )
                
                },
                { 'data': 'tanggal'},
                { 
                    'render': function (data, type, full, meta){
                        if(full.status == "0"){
                            return "Belum Lunas";
                        }else{
                            return "Lunas";
                        }
                    }
                }
            ],
            "order": [],
            "columnDefs": [
                { "orderable": false, "targets": [0,1,2,3,4,5,6] }
            ],
        });
        t.on( 'order.dt search.dt', function () {
            t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                cell.innerHTML = i+1;
            } );
        } ).draw();
        $.fn.dataTable.ext.errMode = 'none';
    };
    var cetakPDF = function(){
        $('#btn-cetak').click(function(){
            demoFromHTML();
        });
    }
    
    function demoFromHTML() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '-' + dd + '-' + yyyy;
        var doc = new jsPDF('p', 'pt');
        var res = doc.autoTableHtmlToJson(document.getElementById('laporan'));
        doc.text("LAPORAN KATERING SAFIRA", 200, 20);
        doc.autoTable(res.columns, res.data, {
            startY: 50
        });
        doc.save('Laporan Katering Safira-'+today+'.pdf');
    }
    return {
        init: function () {
            getDataLaporan();
            cetakPDF();
        }
    };
}();
$(document).ready(function(){
    $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    laporan.init();
});