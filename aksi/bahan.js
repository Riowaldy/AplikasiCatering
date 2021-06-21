var bahan = function () {
    var getDataBahan = function(){
        var t = $('#bahan').DataTable({
            'ajax': {
                'url': '../../controller/readBahan.php',
                'dataSrc': '',
                'processing': true,
            },
            'columns': [
                { 'data': 'id'},
                { 'data': 'nama'},
                { 'data': 'stok'},
                { 'data': 'satuan'},
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
                { "orderable": false, "targets": [0, 4] }
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
            $("#nama_bahan_error").html("");
            $("#nama_bahan_tambah_error").html("");
            $('#nama_bahan_tambah').val("");
            $('#nama_bahan').val("");
            $("#stok_bahan_error").html("");
            $("#stok_bahan_tambah_error").html("");
            $('#stok_bahan_tambah').val("");
            $('#stok_bahan').val("");
            $("#satuan_bahan_error").html("");
            $("#satuan_bahan_tambah_error").html("");
            $('#satuan_bahan_tambah').val("");
            $('#satuan_bahan').val("");
        });
        $('#btn-reset-tambah').click(function(){
            $("#nama_bahan_error").html("");
            $("#nama_bahan_tambah_error").html("");
            $('#nama_bahan_tambah').val("");
            $('#nama_bahan').val("");
            $("#stok_bahan_error").html("");
            $("#stok_bahan_tambah_error").html("");
            $('#stok_bahan_tambah').val("");
            $('#stok_bahan').val("");
            $("#satuan_bahan_error").html("");
            $("#satuan_bahan_tambah_error").html("");
            $('#satuan_bahan_tambah').val("");
            $('#satuan_bahan').val("");
        });
    }

    var tambahData = function () {
        $('#btn-simpan-tambah').click(function(){
            swal({
                title: 'Apakah Anda Yakin?',
                text: 'Menyimpan Data Bahan Ini',
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
                        nama: $('#nama_bahan_tambah').val(),
                        stok: $('#stok_bahan_tambah').val(),
                        satuan: $('#satuan_bahan_tambah').val(),
                    };
                    if(addData.nama == ""){
                        $("#nama_bahan_tambah_error").html("<strong>Data Nama Kosong</strong>");
                    }else if(addData.stok == ""){
                        $("#stok_bahan_tambah_error").html("<strong>Data Stok Kosong</strong>");
                    }else if(addData.satuan == ""){
                        $("#satuan_bahan_tambah_error").html("<strong>Data Satuan Kosong</strong>");
                    }
                    else{
                        $("#nama_bahan_tambah_error").html("");
                        $("#stok_bahan_tambah_error").html("");
                        $("#satuan_bahan_tambah_error").html("");
                        $.ajax({
                            url : "../../controller/createBahan.php",
                            type : "POST",
                            data : addData,
                            success: function(res){
                                const obj = JSON.parse(res);
                                if(obj.statusCode == 200){
                                    $('#bahan').DataTable().ajax.reload();
                                    swal({
                                        title: "Success!",
                                        text : "Data Berhasil Ditambahkan",
                                        confirmButtonColor: "#66BB6A",
                                        type : "success",
                                    });
                                }else if(obj.statusCode == 202){
                                    swal({
                                        title: 'Error',
                                        text : "Nama sudah digunakan",
                                        type : "error",
                                        confirmButtonColor: "#EF5350",
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
        $('#bahan').on('click', '#btn-edit', function () {
            var baris = $(this).parents('tr')[0];
            var table = $('#bahan').DataTable();
            var data = table.row(baris).data();
            id = data[0];
            $('#nama_bahan').val(data[1]);
            $('#stok_bahan').val(data[2]);
            $('#satuan_bahan').val(data[3]);
            $('#btn-simpan-edit').html('Simpan');
            $('#btn-reset-edit').html('Batal');
        });
    };

    var editData = function () {
        $('#btn-simpan-edit').click(function(){
            swal({
                title: 'Apakah Anda Yakin?',
                text: 'Menyimpan Data Bahan Ini',
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
                        nama: $('#nama_bahan').val(),
                        stok: $('#stok_bahan').val(),
                        satuan: $('#satuan_bahan').val(),
                    };
                    if(update.nama == ""){
                        $("#nama_bahan_error").html("<strong>Data Nama Kosong</strong>");
                    } else if(update.stok == ""){
                        $("#stok_bahan_error").html("<strong>Data Stok Kosong</strong>");
                    } else if(update.satuan == ""){
                        $("#satuan_bahan_error").html("<strong>Data Satuan Kosong</strong>");
                    } else{
                        $("#nama_bahan_error").html("");
                        $("#stok_bahan_error").html("");
                        $("#satuan_bahan_error").html("");
                        $.ajax({
                            url : "../../controller/updateBahan.php",
                            type : "POST",
                            data : update,
                            success: function(res){
                                const obj = JSON.parse(res);
                                if(obj.statusCode == 200){
                                    $('#bahan').DataTable().ajax.reload();
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
        $('#bahan').on('click', '#btn-hapus', function () {
            var baris = $(this).parents('tr')[0];
            var table = $('#bahan').DataTable();
            var data = table.row(baris).data();
            id = data[0];
            swal({
                title: 'Apakah Anda Yakin?',
                text: 'Menghapus Data Bahan Ini',
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
                        url : "../../controller/deleteBahan.php",
                        type : "POST",
                        data : delData,
                        success: function(res){
                            const obj = JSON.parse(res);
                            if(obj.statusCode == 200){
                                $('#bahan').DataTable().ajax.reload();
                                swal({
                                    title: "Success!",
                                    text : "Data Berhasil Dihapus",
                                    confirmButtonColor: "#66BB6A",
                                    type : "success",
                                });
                            } else if(obj.statusCode == 202){
                                swal({
                                    title: 'Error',
                                    text : "Bahan Memiliki Data Stok",
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
            getDataBahan();
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
    bahan.init();
});