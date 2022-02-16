var menu = function () {
    var checkSession = function(){
        $.ajax({
            url: "../../controller/checkSession.php",
            type: "GET",
            cache: false,
            success: function(dataResult){
                var dataResult = JSON.parse(dataResult);
                if(dataResult.statusCode==200){
                    if(dataResult.role == 1){
                        getDataMenu();
                        resetData();
                        tambahData();
                        getDataEdit();
                        editData();
                        deleteData();
                    }else if (dataResult.role == 2){
                        $('#btn-tambah').hide();
                        $('td:nth-child(4),th:nth-child(4)').hide();
                        getDataMenuPelanggan();
                    }else{
                        
                    }
                }
                else {
                    
                }
            }
        });
    }
    var getDataMenu = function(){
        var t = $('#menu').DataTable({
            'ajax': {
                'url': '../../controller/readMenu.php',
                'dataSrc': ''
            },
            'columns': [
                { 'data': 'id'},
                {
                    'render': function (data, type, full, meta) {
                        var html = '';
                        html += '<div class="text-center">';
                        html += '<img src="../../public/img/menu/' + full.id + '/' + full.gambar + '" width=100 height=100>';
                        html += '</div>';
                        return html;
                    }
                },
                { 'data': 'nama'},
                { 
                    'data': 'harga', 
                    'render': $.fn.dataTable.render.number( '.', ',', 2, 'Rp' )
                
                },
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

    var getDataMenuPelanggan = function(){
        var t = $('#menu').DataTable({
            'ajax': {
                'url': '../../controller/readMenu.php',
                'dataSrc': ''
            },
            'columns': [
                { 'data': 'id'},
                { 'data': 'nama'},
                { 
                    'data': 'harga', 
                    'render': $.fn.dataTable.render.number( '.', ',', 2, 'Rp' )
                
                }
            ],
            "order": [],
            "columnDefs": [
                { "orderable": false, "targets": [0] }
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
            $("#nama_menu_error").html("");
            $("#nama_menu_tambah_error").html("");
            $('#nama_menu_tambah').val("");
            $('#nama_menu').val("");
            $("#harga_menu_error").html("");
            $("#harga_menu_tambah_error").html("");
            $('#harga_menu_tambah').val("");
            $('#harga_menu').val("");
            $("#gambar_menu_error").html("");
            $("#gambar_menu_tambah_error").html("");
            $('#gambar_menu_tambah').val("");
            $('#gambar_menu').val("");
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
            $("#gambar_menu_error").html("");
            $("#gambar_menu_tambah_error").html("");
            $('#gambar_menu_tambah').val("");
            $('#gambar_menu').val("");
        });
        $('#btn-tambah').click(function(){
            $("#nama_menu_tambah_error").html("");
            $('#nama_menu_tambah').val("");
            $("#harga_menu_tambah_error").html("");
            $('#harga_menu_tambah').val("");
            $("#gambar_menu_tambah_error").html("");
            $('#gambar_menu_tambah').val("");
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
                    $("#nama_menu_tambah_error").html("");
                    $("#harga_menu_tambah_error").html("");
                    $("#gambar_menu_tambah_error").html("");
                    
                    var addData = {
                        nama: $('#nama_menu_tambah').val(),
                        harga: $('#harga_menu_tambah').val(),
                        gambar: $('#gambar_menu_tambah').val(),
                    };
                    
                    var myFile = $('#gambar_menu_tambah').prop('files');
                    var formData = new FormData();
                    formData.append('nama', $('#nama_menu_tambah').val());
                    formData.append('harga', $('#harga_menu_tambah').val());
                    formData.append('gambar', myFile[0]);
                    if(addData.nama == ""){
                        $("#nama_menu_tambah_error").html("<strong>Data Nama Kosong</strong>");
                    }else if(addData.harga == ""){
                        $("#harga_menu_tambah_error").html("<strong>Data Harga Kosong</strong>");
                    }else if(addData.gambar == ""){
                        $("#gambar_menu_tambah_error").html("<strong>Data Gambar Kosong</strong>");
                    }
                    else{
                        var extention = myFile[0].name.split('.').pop();
                        if(extention != "jpg" & extention != "jpeg" & extention != "png"){
                            $("#gambar_menu_tambah_error").html("<strong>Format Gambar Harus (jpg / jpeg / png)</strong>");
                        }else{
                            $.ajax({
                                url : "../../controller/createMenu.php",
                                type : "POST",
                                data : formData,
                                processData: false,
                                contentType: false,
                                success: function(res){
                                    const obj = JSON.parse(res);
                                    if(obj.statusCode == 200){
                                        $('#menu').DataTable().ajax.reload();
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
                        gambar: $('#gambar_menu').val(),
                    };

                    var myFile = $('#gambar_menu').prop('files');
                    var formData = new FormData();
                    formData.append('id', id);
                    formData.append('nama', $('#nama_menu').val());
                    formData.append('harga', $('#harga_menu').val());
                    formData.append('gambar', myFile[0]);
                    if(myFile.length == 0){
                        formData.append('cekgambar', 0);
                    }else{
                        formData.append('cekgambar', 1);
                    }
                    if(update.nama == ""){
                        $("#nama_menu_error").html("<strong>Data Nama Kosong</strong>");
                    } else if(update.harga == ""){
                        $("#harga_menu_error").html("<strong>Data Harga Kosong</strong>");
                    } else{
                        var extention = "jpg";
                        if(update.gambar != ""){
                            extention = myFile[0].name.split('.').pop();
                        }
                        if(extention != "jpg" && extention != "jpeg" && extention != "png"){
                            $("#gambar_menu_error").html("<strong>Format Gambar Harus (jpg / jpeg / png)</strong>");
                        }else{
                            $.ajax({
                                url : "../../controller/updateMenu.php",
                                type : "POST",
                                data : formData,
                                processData: false,
                                contentType: false,
                                success: function(res){
                                    console.log(res);
                                    const obj = JSON.parse(res);
                                    if(obj.statusCode == 200){
                                        $('#menu').DataTable().ajax.reload();
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
                                    text : "Menu Memiliki Data Pesanan",
                                    type : "error",
                                    confirmButtonColor: "#EF5350",
                                });
                            } else if(obj.statusCode == 203){
                                swal({
                                    title: 'Error',
                                    text : "Menu Memiliki Data Stok",
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
            checkSession();
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