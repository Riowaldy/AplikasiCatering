var menu = function () {
    var getDataMenu = function(){
        var t = $('#menu').DataTable({
            'ajax': {
                'url': '../../controller/readMenu.php',
                'dataSrc': ''
            },
            'columns': [
                { 'data': 'id'},
                { 'data': 'nama'},
                { 'data': 'harga'},
                {
                    'render': function (data, type, full, meta) {
                        var html = '';
                        html += '<div class="text-center">';
                        html += '<div class="btn-group btn-group-solid">';
                        html += '<a href="#edit" class="btn btn-primary btn-raised btn-xs" data-toggle="modal" data-target="#form-edit" id="btn-edit" title="Ubah Data"><i class="fas fa-edit"></i></a>';
                        html += '<a href="#hapus" class="btn btn-danger btn-raised btn-xs" id="btn-hapus" title="Hapus Data"><i class="fas fa-trash"></i></a>';
                        html += '</div>';
                        html += '</div>';
                        return html;
                    }
                }
            ],
            "order": [],
            "columnDefs": [
                { "orderable": false, "targets": [3] }
            ]
        });
        t.on( 'order.dt search.dt', function () {
            t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                cell.innerHTML = i+1;
            } );
        } ).draw();
    };

    var resetData = function(){
        $('#btn-reset-edit').click(function(){
            $("#nama_menu_error").html("");
            $("#nama_menu_tambah_error").html("");
            $('#nama_menu_tambah').val("");
            $('#nama_menu').val("");
            $("#harga_menu_error").html("");
            $("#harga_menu_tambah_error").html("");
            $('#harga_menu_tambah').val("");
            $('#harga_menu').val("");
        });
        $('#btn-reset-tambah').click(function(){
            $("#nama_menu_error").html("");
            $("#nama_menu_tambah_error").html("");
            $('#nama_menu_tambah').val("");
            $('#nama_menu').val("");
            $("#harga_menu_error").html("");
            $("#harga_menu_tambah_error").html("");
            $('#harga_menu_tambah').val("");
            $('#harga_menu').val("");
        });
    }

    var tambahData = function () {
        $('#btn-simpan-tambah').click(function(){
            swal({
                title: 'Apakah Anda Yakin?',
                text: 'Menyimpan Data Menu Ini',
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
                        nama: $('#nama_menu_tambah').val(),
                        harga: $('#harga_menu_tambah').val(),
                    };
                    if(addData.nama == ""){
                        $("#nama_menu_tambah_error").html("<strong>Data Nama Kosong</strong>");
                    }else if(addData.harga == ""){
                        $("#harga_menu_tambah_error").html("<strong>Data Harga Kosong</strong>");
                    }
                    else{
                        $("#nama_menu_tambah_error").html("");
                        $("#harga_menu_tambah_error").html("");
                        $.ajax({
                            url : "../../controller/createMenu.php",
                            type : "POST",
                            data : addData,
                            success: function(res){
                                $('#menu').DataTable().ajax.reload();
                                swal({
                                    title: "Success!",
                                    text : "Data Berhasil Ditambahkan",
                                    confirmButtonColor: "#66BB6A",
                                    type : "success",
                                });
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
        $('#menu').on('click', '#btn-edit', function () {
            var baris = $(this).parents('tr')[0];
            var table = $('#menu').DataTable();
            var data = table.row(baris).data();
            id = data[0];
            $('#nama_menu').val(data[1]);
            $('#harga_menu').val(data[2]);
            $('#btn-simpan-edit').html('Simpan');
            $('#btn-reset-edit').html('Batal');
        });
    };

    var editData = function () {
        $('#btn-simpan-edit').click(function(){
            swal({
                title: 'Apakah Anda Yakin?',
                text: 'Menyimpan Data Menu Ini',
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
                        nama: $('#nama_menu').val(),
                        harga: $('#harga_menu').val(),
                    };
                    if(update.nama == ""){
                        $("#nama_menu_error").html("<strong>Data Nama Kosong</strong>");
                    } else if(update.harga == ""){
                        $("#harga_menu_error").html("<strong>Data Harga Kosong</strong>");
                    } else{
                        $("#nama_menu_error").html("");
                        $("#harga_menu_error").html("");
                        $.ajax({
                            url : "../../controller/updateMenu.php",
                            type : "POST",
                            data : update,
                            success: function(res){
                                $('#menu').DataTable().ajax.reload();
                                swal({
                                    title: "Success!",
                                    text : "Data Berhasil Diubah",
                                    confirmButtonColor: "#66BB6A",
                                    type : "success",
                                });
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
        $('#menu').on('click', '#btn-hapus', function () {
            var baris = $(this).parents('tr')[0];
            var table = $('#menu').DataTable();
            var data = table.row(baris).data();
            id = data[0];
            swal({
                title: 'Apakah Anda Yakin?',
                text: 'Menghapus Data Menu Ini',
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
                        url : "../../controller/deleteMenu.php",
                        type : "POST",
                        data : delData,
                        success: function(res){
                            $('#menu').DataTable().ajax.reload();
                            swal({
                                title: "Success!",
                                text : "Data Berhasil Dihapus",
                                confirmButtonColor: "#66BB6A",
                                type : "success",
                            });
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
            getDataMenu();
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
    menu.init();
});