var pelanggan = function () {
    var getDataPelanggan = function(){
        var t = $('#pelanggan').DataTable({
            'ajax': {
                'url': '../../controller/readPelanggan.php',
                'dataSrc': ''
            },
            'columns': [
                { 'data': 'id'},
                { 'data': 'username'},
                { 'data': 'password'},
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
                }
            ],
            "order": [],
            "columnDefs": [
                { "orderable": false, "targets": [0, 3] }
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
            $("#username_pelanggan_error").html("");
            $("#username_pelanggan_tambah_error").html("");
            $('#username_pelanggan_tambah').val("");
            $('#username_pelanggan').val("");
            $("#password_pelanggan_error").html("");
            $("#password_pelanggan_tambah_error").html("");
            $('#password_pelanggan_tambah').val("");
            $('#password_pelanggan').val("");
        });
        $('#btn-reset-tambah').click(function(){
            $("#username_pelanggan_error").html("");
            $("#username_pelanggan_tambah_error").html("");
            $('#username_pelanggan_tambah').val("");
            $('#username_pelanggan').val("");
            $("#password_pelanggan_error").html("");
            $("#password_pelanggan_tambah_error").html("");
            $('#password_pelanggan_tambah').val("");
            $('#password_pelanggan').val("");
        });
        $('#btn-tambah').click(function(){
            $("#username_pelanggan_tambah_error").html("");
            $('#username_pelanggan_tambah').val("");
            $("#password_pelanggan_tambah_error").html("");
            $('#password_pelanggan_tambah').val("");
        });
    }

    var tambahData = function () {
        $('#btn-simpan-tambah').click(function(){
            swal({
                title: 'Apakah Anda Yakin?',
                text: 'Menyimpan Data Pelanggan Ini',
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
                        username: $('#username_pelanggan_tambah').val(),
                        password: $('#password_pelanggan_tambah').val(),
                    };
                    if(addData.username == ""){
                        $("#username_pelanggan_tambah_error").html("<strong>Data Username Kosong</strong>");
                    }else if(addData.password == ""){
                        $("#password_pelanggan_tambah_error").html("<strong>Data Password Kosong</strong>");
                    }
                    else{
                        $("#username_pelanggan_tambah_error").html("");
                        $("#password_pelanggan_tambah_error").html("");
                        $.ajax({
                            url : "../../controller/createPelanggan.php",
                            type : "POST",
                            data : addData,
                            success: function(res){
                                const obj = JSON.parse(res);
                                if(obj.statusCode == 200){
                                    $('#pelanggan').DataTable().ajax.reload();
                                    swal({
                                        title: "Success!",
                                        text : "Data Berhasil Ditambahkan",
                                        confirmButtonColor: "#66BB6A",
                                        type : "success",
                                    });
                                } else if(obj.statusCode == 202){
                                    swal({
                                        title: 'Error',
                                        text : "Username sudah digunakan",
                                        type : "error",
                                        confirmButtonColor: "#EF5350",
                                    });
                                } else{
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
        $('#pelanggan').on('click', '#btn-edit', function () {
            var baris = $(this).parents('tr')[0];
            var table = $('#pelanggan').DataTable();
            var data = table.row(baris).data();
            id = data[0];
            $('#username_pelanggan').val(data[1]);
            $('#password_pelanggan').val(data[2]);
            $('#btn-simpan-edit').html('Simpan');
            $('#btn-reset-edit').html('Batal');
        });
    };

    var editData = function () {
        $('#btn-simpan-edit').click(function(){
            swal({
                title: 'Apakah Anda Yakin?',
                text: 'Menyimpan Data Pelanggan Ini',
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
                        username: $('#username_pelanggan').val(),
                        password: $('#password_pelanggan').val(),
                    };
                    if(update.username == ""){
                        $("#username_pelanggan_error").html("<strong>Data Username Kosong</strong>");
                    } else if(update.password == ""){
                        $("#password_pelanggan_error").html("<strong>Data Password Kosong</strong>");
                    } else{
                        $("#username_pelanggan_error").html("");
                        $("#password_pelanggan_error").html("");
                        $.ajax({
                            url : "../../controller/updatePelanggan.php",
                            type : "POST",
                            data : update,
                            success: function(res){
                                const obj = JSON.parse(res);
                                if(obj.statusCode == 200){
                                    $('#pelanggan').DataTable().ajax.reload();
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
        $('#pelanggan').on('click', '#btn-hapus', function () {
            var baris = $(this).parents('tr')[0];
            var table = $('#pelanggan').DataTable();
            var data = table.row(baris).data();
            id = data[0];
            swal({
                title: 'Apakah Anda Yakin?',
                text: 'Menghapus Data Pelanggan Ini',
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
                        url : "../../controller/deletePelanggan.php",
                        type : "POST",
                        data : delData,
                        success: function(res){
                            const obj = JSON.parse(res);
                            if(obj.statusCode == 200){
                                location.reload();
                                swal({
                                    title: "Success!",
                                    text : "Data Berhasil Dihapus",
                                    confirmButtonColor: "#66BB6A",
                                    type : "success",
                                });
                            } else if(obj.statusCode == 202){
                                swal({
                                    title: 'Error',
                                    text : "Pelanggan Memiliki Data Pesanan",
                                    type : "error",
                                    confirmButtonColor: "#EF5350",
                                });
                            } else{
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
            getDataPelanggan();
            resetData();
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
    pelanggan.init();
});