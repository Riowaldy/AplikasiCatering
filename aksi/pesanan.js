var pesanan = function () {
    var checkSession = function(){
        $.ajax({
            url: "../../controller/checkSession.php",
            type: "GET",
            cache: false,
            success: function(dataResult){
                var dataResult = JSON.parse(dataResult);
                if(dataResult.statusCode==200){
                    if(dataResult.role == 1){
                        getDataPesanan();
                        dropdownPelanggan();
                        deleteData();
                        statusData();
                    }else if (dataResult.role == 2){
                        getDataPesananPelanggan();
                        dropdownPelangganPelanggan();
                    }else{
                        
                    }
                }
                else {
                    
                }
            }
        });
    }
    var getDataPesanan = function(){
        var t = $('#pesanan').DataTable({
            'ajax': {
                'url': '../../controller/readPesanan.php',
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
                    'render': function (data, type, full, meta) {
                        var html = '';
                        html += '<div class="text-center">';
                        if(full.bukti != null){
                            html += '<img id="btn-zoom" data-toggle="modal" data-target="#form-zoom" style="cursor: pointer;" src="../../public/img/bukti/' + full.id + '/' + full.bukti + '" width=100 height=100>';
                        }
                        html += '</div>';
                        return html;
                    }
                },
                { 
                    'render': function (data, type, full, meta){
                        var today = new Date();
                        var day = new Date(full.tanggal);
                        if(day < today){
                            return "Batal";
                        }
                        if(full.status == "0"){
                            return "Belum Lunas";
                        }else{
                            return "Lunas";
                        }
                    }
                },
                {
                    'render': function (data, type, full, meta) {
                        var html = '';
                        html += '<div class="text-center">';
                        html += '<div class="btn-group btn-group-solid">';
                        var today = new Date();
                        var day = new Date(full.tanggal);
                        if(day > today){
                            if(full.status == "0"){
                                html += '<a href="#status" class="btn btn-success btn-raised btn-xs" id="btn-status" title="Status"><i class="fas fa-check"></i></a>&nbsp;';
                                html += '<a href="#bayar" class="btn btn-warning btn-raised btn-xs" id="btn-bayar" title="Ubah Data"><i class="fas fa-money-check-alt"></i></a>&nbsp;';
                            }
                        }
                        html += '</div>';
                        html += '</div>';
                        return html;
                    }
                },
                { 'data': 'menuid'},
                { 'data': 'userid'},
                { 'data': 'nohp'},
            ],
            "order": [],
            "columnDefs": [
                {
                    "targets": [9,10,11],
                    "visible": false,
                    "searchable": false
                },
                { "orderable": false, "targets": [0,8] }
            ]
        });
        t.on( 'order.dt search.dt', function () {
            t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                cell.innerHTML = i+1;
            } );
        } ).draw();
        $.fn.dataTable.ext.errMode = 'none';
    };

    var getDataPesananPelanggan = function(){
        var t = $('#pesanan').DataTable({
            'ajax': {
                'url': '../../controller/readPesanan.php',
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
                    'render': function (data, type, full, meta) {
                        var html = '';
                        html += '<div class="text-center">';
                        if(full.bukti != null){
                            html += '<img id="btn-zoom" data-toggle="modal" data-target="#form-zoom" style="cursor: pointer;" src="../../public/img/bukti/' + full.id + '/' + full.bukti + '" width=100 height=100>';
                        }
                        html += '</div>';
                        return html;
                    }
                },
                { 
                    'render': function (data, type, full, meta){
                        if(full.status == "0"){
                            return "Belum Lunas";
                        }else{
                            return "Lunas";
                        }
                    }
                },
                {
                    'render': function (data, type, full, meta) {
                        var html = '';
                        html += '<div class="text-center">';
                        html += '<div class="btn-group btn-group-solid">';
                        if(full.status == "0"){
                            html += '<a href="#edit" class="btn btn-primary btn-raised btn-xs" data-toggle="modal" data-target="#form-edit" id="btn-edit" title="Ubah Data"><i class="fas fa-edit"></i></a>&nbsp;';
                            html += '<a href="#bukti" class="btn btn-warning btn-raised btn-xs" data-toggle="modal" data-target="#form-bukti" id="btn-bukti" title="Upload Bukti"><i class="fas fa-money-check-alt"></i></a>&nbsp;';
                        }
                        html += '</div>';
                        html += '</div>';
                        return html;
                    }
                },
                { 'data': 'menuid'},
                { 'data': 'userid'},
            ],
            "order": [],
            "columnDefs": [
                {
                    "targets": [9,10],
                    "visible": false,
                    "searchable": false
                },
                { "orderable": false, "targets": [0,8] }
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
            $("#pesanan_pesanan_error").html("");
            $("#pesanan_pesanan_tambah_error").html("");
            $('#pesanan_pesanan_tambah').val("0");
            $('#pesanan_pesanan').val("");
            $("#pelanggan_pesanan_error").html("");
            $("#pelanggan_pesanan_tambah_error").html("");
            $('#pelanggan_pesanan').val("");
            $("#jumlah_pesanan_error").html("");
            $("#jumlah_pesanan_tambah_error").html("");
            $('#jumlah_pesanan_tambah').val("");
            $('#jumlah_pesanan').val("");
            $("#tanggal_pesanan_error").html("");
            $("#tanggal_pesanan_tambah_error").html("");
            $('#tanggal_pesanan_tambah').val("");
            $('#tanggal_pesanan').val("");
            $("#gambar_menu_error").html("");
            $('#gambar_menu').val("");
        });
        $('#btn-reset-tambah').click(function(){
            $("#pesanan_pesanan_error").html("");
            $("#pesanan_pesanan_tambah_error").html("");
            $('#pesanan_pesanan_tambah').val("0");
            $('#pesanan_pesanan').val("");
            $("#pelanggan_pesanan_error").html("");
            $("#pelanggan_pesanan_tambah_error").html("");
            $('#pelanggan_pesanan').val("");
            $("#jumlah_pesanan_error").html("");
            $("#jumlah_pesanan_tambah_error").html("");
            $('#jumlah_pesanan_tambah').val("");
            $('#jumlah_pesanan').val("");
            $("#tanggal_pesanan_error").html("");
            $("#tanggal_pesanan_tambah_error").html("");
            $('#tanggal_pesanan_tambah').val("");
            $('#tanggal_pesanan').val("");
            $("#gambar_menu_error").html("");
            $('#gambar_menu').val("");
        });
        $('#btn-tambah').click(function(){
            $("#pesanan_pesanan_tambah_error").html("");
            $('#pesanan_pesanan_tambah').val("0");
            $("#pelanggan_pesanan_tambah_error").html("");
            $("#jumlah_pesanan_tambah_error").html("");
            $('#jumlah_pesanan_tambah').val("");
            $("#tanggal_pesanan_tambah_error").html("");
            $('#tanggal_pesanan_tambah').val("");
            $("#gambar_menu_error").html("");
            $('#gambar_menu').val("");
        });
    }

    var dropdownPesanan = function(){
        var req = $.ajax({
            url: '../../controller/dropPesanan.php',
            method: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            timeout: 30000,
        });
        req.done(function (data) {
            var x = "";
            x += '<option value="0">Pilih Pesanan</option>';
            data.forEach(res => {
                x += '<option value="' + res.id + '">' + res.nama + '</option>';
            });
            $('#pesanan_pesanan_tambah').append(x);
            $('#pesanan_pesanan').append(x);
        });
    }

    var dropdownPelanggan = function(){
        var req = $.ajax({
            url: '../../controller/dropPelanggan.php',
            method: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            timeout: 30000,
        });
        req.done(function (data) {
            var x = "";
            x += '<option value="0">Pilih Pelanggan</option>';
            data.forEach(res => {
                x += '<option value="' + res.id + '">' + res.nama + '</option>';
            });
            $('#pelanggan_pesanan_tambah').append(x);
            $('#pelanggan_pesanan').append(x);
        });
    }

    var dropdownPelangganPelanggan = function(){
        var req = $.ajax({
            url: '../../controller/dropPelanggan.php',
            method: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            timeout: 30000,
        });
        req.done(function (data) {
            var x = "";
            data.forEach(res => {
                x += '<option value="' + res.id + '">' + res.nama + '</option>';
            });
            $('#pelanggan_pesanan_tambah').append(x);
            $('#pelanggan_pesanan_tambah').attr("disabled", true);
            $('#pelanggan_pesanan').append(x);
        });
    }

    var tambahData = function () {
        $('#btn-simpan-tambah').click(function(){
            $("#pesanan_pesanan_tambah_error").html("");
            $("#pelanggan_pesanan_tambah_error").html("");
            $("#jumlah_pesanan_tambah_error").html("");
            $("#tanggal_pesanan_tambah_error").html("");
            swal({
                title: 'Apakah Anda Yakin?',
                text: 'Menyimpan Data Pesanan Ini',
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
                        pesanan: $('#pesanan_pesanan_tambah').val(),
                        pelanggan: $('#pelanggan_pesanan_tambah').val(),
                        jumlah: $('#jumlah_pesanan_tambah').val(),
                        tanggal: $('#tanggal_pesanan_tambah').val(),
                    };
                    var today = new Date();
                    today.setDate(today.getDate() + 7);
                    var day = new Date(addData.tanggal);
                    if(addData.pesanan == "" || addData.pesanan == "0"){
                        $("#pesanan_pesanan_tambah_error").html("<strong>Data Pesanan Kosong</strong>");
                    }else if(addData.pelanggan == "" || addData.pelanggan == 0){
                        $("#pelanggan_pesanan_tambah_error").html("<strong>Data Pelanggan Kosong</strong>");
                    }else if(addData.jumlah == ""){
                        $("#jumlah_pesanan_tambah_error").html("<strong>Data Jumlah Kosong</strong>");
                    }else if(addData.jumlah < 40){
                        $("#jumlah_pesanan_tambah_error").html("<strong>Mininal Pemesanan 40 item</strong>");
                    }else if(addData.tanggal == ""){
                        $("#tanggal_pesanan_tambah_error").html("<strong>Data Tanggal Kosong</strong>");
                    }else if(day < today){
                        $("#tanggal_pesanan_tambah_error").html("<strong>Tanggal Pemesanan Minimal H-7 Dari Sekarang</strong>");
                    }
                    else{
                        $("#pesanan_pesanan_tambah_error").html("");
                        $("#pelanggan_pesanan_tambah_error").html("");
                        $("#jumlah_pesanan_tambah_error").html("");
                        $("#tanggal_pesanan_tambah_error").html("");
                        $.ajax({
                            url : "../../controller/createPesanan.php",
                            type : "POST",
                            data : addData,
                            success: function(res){
                                const obj = JSON.parse(res);
                                if(obj.statusCode == 200){
                                    $('#pesanan').DataTable().ajax.reload();
                                    swal({
                                        title: "Success!",
                                        text : "Data Berhasil Ditambahkan",
                                        confirmButtonColor: "#66BB6A",
                                        type : "success",
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

    var getDataBayar = function(){
        $('#pesanan').on('click', '#btn-bayar', function () {
            var baris = $(this).parents('tr')[0];
            var table = $('#pesanan').DataTable();
            var data = table.row(baris).data();
            jumlah = data["jumlah"];
            harga = data["harga"];
            nohp = data["nohp"];
            nohp = nohp.substring(1);
            window.open('https://api.whatsapp.com/send/?phone=62' + nohp + '&text=Terima+kasih+sudah+belanja+di+Catering+Safira.%0D%0A%0D%0ATotal+Pesanan+anda+adalah+' + harga + '.%0D%0AJumlah+pesanan+' + jumlah + '.%0D%0A%0D%0AMohon+menyelesaikan+pembayaran.+Terima+kasih.','_blank');
        });
    };

    var getDataEdit = function(){
        $('#pesanan').on('click', '#btn-edit', function () {
            var baris = $(this).parents('tr')[0];
            var table = $('#pesanan').DataTable();
            var data = table.row(baris).data();
            id = data["id"];
            var newDate = new Date(data["tanggal"].toString().split('GMT')[0]+' UTC').toISOString().split('.')[0];
            $('#pesanan_pesanan').val(data["menuid"]);
            $('#pelanggan_pesanan').val(data["userid"]);
            $('#jumlah_pesanan').val(data["jumlah"]);
            $('#tanggal_pesanan').val(newDate);
            $('#btn-simpan-edit').html('Simpan');
            $('#btn-reset-edit').html('Batal');
        });
    };

    var getDataBukti = function(){
        $('#pesanan').on('click', '#btn-bukti', function () {
            var baris = $(this).parents('tr')[0];
            var table = $('#pesanan').DataTable();
            var data = table.row(baris).data();
            id = data[0];
            $('#btn-simpan-bukti').html('Simpan');
            $('#btn-reset-bukti').html('Batal');
        });
    };

    var getDataZoom = function(){
        $('#pesanan').on('click', '#btn-zoom', function () {
            var baris = $(this).parents('tr')[0];
            var table = $('#pesanan').DataTable();
            var data = table.row(baris).data();
            id = data[0];
            $('#bukti_zoom').html('<img width="200" src="../../public/img/bukti/' + data[0] + '/' + data[10] + '">');
            $('#btn-reset-bukti').html('Close');
        });
    };

    var buktiData = function () {
        $('#btn-simpan-bukti').click(function(){
            var update = {
                id: id,
                gambar: $('#gambar_menu').val(),
            };
            var myFile = $('#gambar_menu').prop('files');
            var formData = new FormData();
            formData.append('id', id);
            formData.append('gambar', myFile[0]);
            if(myFile.length == 0){
                formData.append('cekgambar', 0);
            }else{
                formData.append('cekgambar', 1);
            }
            var extention = "jpg";
            if(update.gambar != ""){
                extention = myFile[0].name.split('.').pop();
            }
            if(extention != "jpg" && extention != "jpeg" && extention != "png"){
                $("#gambar_menu_error").html("<strong>Format Gambar Harus (jpg / jpeg / png)</strong>");
            }else{
                $.ajax({
                    url : "../../controller/buktiPesanan.php",
                    type : "POST",
                    data : formData,
                    processData: false,
                    contentType: false,
                    success: function(res){
                        const obj = JSON.parse(res);
                        if(obj.statusCode == 200){
                            $('#pesanan').DataTable().ajax.reload();
                            swal({
                                title: "Success!",
                                text : "Data Berhasil Diupload",
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
                        $('#form-bukti').modal('hide');
                    },
                    error : function(res){
                        swal({
                            title: "Error!",
                            text : "Data Tidak Valid",
                            confirmButtonColor: "#EF5350",
                            type : "error",
                        });
                        $('#form-bukti').modal('hide');
                    }
                });
            }
        })
    }

    var editData = function () {
        $('#btn-simpan-edit').click(function(){
            $("#pesanan_pesanan_error").html("");
            $("#pelanggan_pesanan_error").html("");
            $("#jumlah_pesanan_error").html("");
            $("#tanggal_pesanan_error").html("");
            swal({
                title: 'Apakah Anda Yakin?',
                text: 'Menyimpan Data Pesanan Ini',
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
                        pesanan: $('#pesanan_pesanan').val(),
                        pelanggan: $('#pelanggan_pesanan').val(),
                        jumlah: $('#jumlah_pesanan').val(),
                        tanggal: $('#tanggal_pesanan').val(),
                    };
                    var today = new Date();
                    today.setDate(today.getDate() + 7);
                    var day = new Date(update.tanggal);
                    if(update.pesanan == "" || update.pesanan == "0"){
                        $("#pesanan_pesanan_error").html("<strong>Data Pesanan Kosong</strong>");
                    } else if(update.pelanggan == "" || update.pelanggan == "0"){
                        $("#pelanggan_pesanan_error").html("<strong>Data Pelanggan Kosong</strong>");
                    } else if(update.jumlah == ""){
                        $("#jumlah_pesanan_error").html("<strong>Data Jumlah Kosong</strong>");
                    } else if(update.jumlah < 40){
                        $("#jumlah_pesanan_error").html("<strong>Mininal Pemesanan 40 item</strong>");
                    } else if(update.tanggal == ""){
                        $("#tanggal_pesanan_error").html("<strong>Data Tanggal Kosong</strong>");
                    }else if(day < today){
                        $("#tanggal_pesanan_error").html("<strong>Tanggal Pemesanan Minimal H-7 Dari Sekarang</strong>");
                    } else{
                        $("#pesanan_pesanan_error").val("0");
                        $("#pelanggan_pesanan_error").val("0");
                        $("#jumlah_pesanan_error").html("");
                        $("#tanggal_pesanan_error").html("");
                        $.ajax({
                            url : "../../controller/updatePesanan.php",
                            type : "POST",
                            data : update,
                            success: function(res){
                                const obj = JSON.parse(res);
                                if(obj.statusCode == 200){
                                    $('#pesanan').DataTable().ajax.reload();
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
        $('#pesanan').on('click', '#btn-hapus', function () {
            var baris = $(this).parents('tr')[0];
            var table = $('#pesanan').DataTable();
            var data = table.row(baris).data();
            id = data[0];
            swal({
                title: 'Apakah Anda Yakin?',
                text: 'Menghapus Data Pesanan Ini',
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
                        url : "../../controller/deletePesanan.php",
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

    var statusData = function () {
        $('#pesanan').on('click', '#btn-status', function () {
            var baris = $(this).parents('tr')[0];
            var table = $('#pesanan').DataTable();
            var data = table.row(baris).data();
            id = data[0];
            status = data[6];
            swal({
                title: 'Apakah Anda Yakin?',
                text: 'Mengganti Status Pesanan Ini',
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
                    var updData = {
                        id: id,
                        status: status
                    };
                    $.ajax({
                        url : "../../controller/updateStatusPesanan.php",
                        type : "POST",
                        data : updData,
                        success: function(res){
                            const obj = JSON.parse(res);
                            if(obj.statusCode == 200){
                                $('#pesanan').DataTable().ajax.reload();
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
            checkSession();
            resetData();
            dropdownPesanan();
            tambahData();
            getDataBayar();
            getDataEdit();
            editData();
            getDataBukti();
            buktiData();
            getDataZoom();
        }
    };
}();
$(document).ready(function(){
    $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    pesanan.init();
});