var stok = function () {
    var getDataStok = function(){
        var t = $('#stok').DataTable({
            'ajax': {
                'url': '../../controller/readStok.php',
                'dataSrc': ''
            },
            'columns': [
                { 'data': 'id'},
                { 'data': 'menu'},
                { 'data': 'bahan'},
                { 'data': 'jumlah'},
                {
                    'render': function (data, type, full, meta) {
                        var html = '';
                        html += '<div class="text-center">';
                        html += '<div class="btn-group btn-group-solid">';
                        html += '<a href="#edit" class="btn btn-primary btn-raised btn-xs" data-toggle="modal" data-target="#form-edit" id="btn-edit" title="Ubah Data"><i class="fas fa-edit"></i></a>&nbsp;';
                        html += '<a href="#hapus" class="btn btn-danger btn-raised btn-xs" id="btn-hapus" title="Hapus Data"><i class="fas fa-trash"></i></a>';
                        html += '</div>';
                        html += '</div>';
                        return html;
                    }
                },
                { 'data': 'menuid'},
                { 'data': 'bahanid'},
            ],
            "order": [],
            "columnDefs": [
                {
                    "targets": [5,6],
                    "visible": false,
                    "searchable": false
                },
                { "orderable": false, "targets": [0,4] }
            ]
        });
        t.on( 'order.dt search.dt', function () {
            t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                cell.innerHTML = i+1;
            } );
        } ).draw();
        $.fn.dataTable.ext.errMode = 'none';
    };

    var resetData = function(){
        $('#btn-reset-edit').click(function(){
            $("#menu_stok_error").html("");
            $("#menu_stok_tambah_error").html("");
            $('#menu_stok_tambah').val("0");
            $('#menu_stok').val("");
            $("#bahan_stok_error").html("");
            $("#bahan_stok_tambah_error").html("");
            $('#bahan_stok_tambah').val("0");
            $('#bahan_stok').val("");
            $("#jumlah_stok_error").html("");
            $("#jumlah_stok_tambah_error").html("");
            $('#jumlah_stok_tambah').val("");
            $('#jumlah_stok').val("");
        });
        $('#btn-reset-tambah').click(function(){
            $("#menu_stok_error").html("");
            $("#menu_stok_tambah_error").html("");
            $('#menu_stok_tambah').val("0");
            $('#menu_stok').val("");
            $("#bahan_stok_error").html("");
            $("#bahan_stok_tambah_error").html("");
            $('#bahan_stok_tambah').val("0");
            $('#bahan_stok').val("");
            $("#jumlah_stok_error").html("");
            $("#jumlah_stok_tambah_error").html("");
            $('#jumlah_stok_tambah').val("");
            $('#jumlah_stok').val("");
        });
    }

    var dropdownMenu = function(){
        var req = $.ajax({
            url: '../../controller/dropPesanan.php',
            method: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            timeout: 30000,
        });
        req.done(function (data) {
            var x = "";
            x += '<option value="0">Pilih Menu</option>';
            data.forEach(res => {
                x += '<option value="' + res.id + '">' + res.nama + '</option>';
            });
            $('#menu_stok_tambah').append(x);
            $('#menu_stok').append(x);
        });
    }

    var dropdownBahan = function(){
        var req = $.ajax({
            url: '../../controller/dropBahan.php',
            method: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            timeout: 30000,
        });
        req.done(function (data) {
            var x = "";
            x += '<option value="0">Pilih Bahan</option>';
            data.forEach(res => {
                x += '<option value="' + res.id + '">' + res.nama + ' / ' + res.satuan + '</option>';
            });
            $('#bahan_stok_tambah').append(x);
            $('#bahan_stok').append(x);
        });
    }

    var tambahData = function () {
        $('#btn-simpan-tambah').click(function(){
            swal({
                title: 'Apakah Anda Yakin?',
                text: 'Menyimpan Data Stok Ini',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#2196F3',
                confirmButtonText: 'Ya',
                cancelButtonText: 'Tidak',
                closeOnConfirm: false,
                closeOnCancel: true,
                showLoaderOnConfirm: true
            })
            .then((isConfirm) => {
                window.onkeydown = null;
                window.onfocus = null;
                if (isConfirm) {
                    var addData = {
                        menu: $('#menu_stok_tambah').val(),
                        bahan: $('#bahan_stok_tambah').val(),
                        jumlah: $('#jumlah_stok_tambah').val(),
                    };
                    if(addData.menu == "" || addData.menu == "0"){
                        $("#menu_stok_tambah_error").html("<strong>Data Menu Kosong</strong>");
                    }else if(addData.bahan == "" || addData.bahan == "0"){
                        $("#bahan_stok_tambah_error").html("<strong>Data Bahan Kosong</strong>");
                    }else if(addData.jumlah == ""){
                        $("#jumlah_stok_tambah_error").html("<strong>Data Jumlah Kosong</strong>");
                    }
                    else{
                        $("#menu_stok_tambah_error").html("");
                        $("#bahan_stok_tambah_error").html("");
                        $("#jumlah_stok_tambah_error").html("");
                        $.ajax({
                            url : "../../controller/createStok.php",
                            type : "POST",
                            data : addData,
                            success: function(res){
                                const obj = JSON.parse(res);
                                if(obj.statusCode == 200){
                                    $('#stok').DataTable().ajax.reload();
                                    swal({
                                        title: "Success!",
                                        text : "Data Berhasil Ditambahkan",
                                        confirmButtonColor: "#66BB6A",
                                        type : "success",
                                    });
                                }else{
                                    swal({
                                        title: 'Error',
                                        text : "Data Gagal Ditambahkan",
                                        type : "error",
                                        confirmButtonColor: "#EF5350",
                                    });
                                }
                                $('#form-tambah').modal('hide');
                            },
                            error : function(res){
                                swal({
                                    title: 'Error',
                                    text : "Data Gagal Ditambahkan",
                                    type : "error",
                                    confirmButtonColor: "#EF5350",
                                });
                                $('#form-tambah').modal('hide');
                            }
                        })
                    }
                } else {
                    swal("Aksi Dibatalkan!");
                    $('#form-tambah').modal('hide');
                }
            });
        });
    };

    var getDataEdit = function(){
        $('#stok').on('click', '#btn-edit', function () {
            var baris = $(this).parents('tr')[0];
            var table = $('#stok').DataTable();
            var data = table.row(baris).data();
            id = data[0];
            $('#menu_stok').val(data[4]);
            $('#bahan_stok').val(data[5]);
            $('#jumlah_stok').val(data[3]);
            $('#btn-simpan-edit').html('Simpan');
            $('#btn-reset-edit').html('Batal');
        });
    };

    var editData = function () {
        $('#btn-simpan-edit').click(function(){
            swal({
                title: 'Apakah Anda Yakin?',
                text: 'Menyimpan Data Stok Ini',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#2196F3',
                confirmButtonText: 'Ya',
                cancelButtonText: 'Tidak',
                closeOnConfirm: false,
                closeOnCancel: true,
                showLoaderOnConfirm: true
            })
            .then((isConfirm) => {
                window.onkeydown = null;
                window.onfocus = null;
                if (isConfirm) {
                    var update = {
                        id: id,
                        menu: $('#menu_stok').val(),
                        bahan: $('#bahan_stok').val(),
                        jumlah: $('#jumlah_stok').val(),
                    };
                    if(update.menu == "" || update.menu == "0"){
                        $("#menu_stok_error").html("<strong>Data Menu Kosong</strong>");
                    } else if(update.bahan == "" || update.bahan == "0"){
                        $("#bahan_stok_error").html("<strong>Data Bahan Kosong</strong>");
                    } else if(update.jumlah == ""){
                        $("#jumlah_stok_error").html("<strong>Data Jumlah Kosong</strong>");
                    } else{
                        $("#menu_stok_error").val("0");
                        $("#bahan_stok_error").val("0");
                        $("#jumlah_stok_error").html("");
                        $.ajax({
                            url : "../../controller/updateStok.php",
                            type : "POST",
                            data : update,
                            success: function(res){
                                const obj = JSON.parse(res);
                                if(obj.statusCode == 200){
                                    $('#stok').DataTable().ajax.reload();
                                    swal({
                                        title: "Success!",
                                        text : "Data Berhasil Diubah",
                                        confirmButtonColor: "#66BB6A",
                                        type : "success",
                                    });
                                }else{
                                    swal({
                                        title: "Error!",
                                        text : "Data Tidak Valid",
                                        confirmButtonColor: "#EF5350",
                                        type : "error",
                                    });
                                }
                                $('#form-edit').modal('hide');
                            },
                            error : function(res){
                                swal({
                                    title: "Error!",
                                    text : "Data Tidak Valid",
                                    confirmButtonColor: "#EF5350",
                                    type : "error",
                                });
                                $('#form-edit').modal('hide');
                            }
                        });
                    }
                } else {
                    swal("Aksi Dibatalkan!");
                    $('#form-edit').modal('hide');
                }
            });
        });
    };

    var deleteData = function () {
        $('#stok').on('click', '#btn-hapus', function () {
            var baris = $(this).parents('tr')[0];
            var table = $('#stok').DataTable();
            var data = table.row(baris).data();
            id = data[0];
            swal({
                title: 'Apakah Anda Yakin?',
                text: 'Menghapus Data Stok Ini',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#2196F3',
                confirmButtonText: 'Ya',
                cancelButtonText: 'Tidak',
                closeOnConfirm: false,
                closeOnCancel: true,
                showLoaderOnConfirm: true
            })
            .then((isConfirm) => {
                window.onkeydown = null;
                window.onfocus = null;
                if (isConfirm) {
                    var delData = {
                        id: id,
                    };
                    $.ajax({
                        url : "../../controller/deleteStok.php",
                        type : "POST",
                        data : delData,
                        success: function(res){
                            const obj = JSON.parse(res);
                            if(obj.statusCode == 200){
                                $('#stok').DataTable().ajax.reload();
                                swal({
                                    title: "Success!",
                                    text : "Data Berhasil Dihapus",
                                    confirmButtonColor: "#66BB6A",
                                    type : "success",
                                });
                            }else{
                                swal({
                                    title: 'Error',
                                    text : data.message,
                                    type : "error",
                                    confirmButtonColor: "#EF5350",
                                });
                            }
                        },
                        error : function(res){
                            swal({
                                title: 'Error',
                                text : data.message,
                                type : "error",
                                confirmButtonColor: "#EF5350",
                            });
                        }
                    })
                } else {
                    swal("Aksi Dibatalkan!");
                }
            });
        });
    };
    return {
        init: function () {
            getDataStok();
            resetData();
            dropdownMenu();
            dropdownBahan();
            tambahData();
            getDataEdit();
            editData();
            deleteData();
        }
    };
}();
$(document).ready(function(){
    $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    stok.init();
});