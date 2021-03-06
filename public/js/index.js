$.ajax({
    url: "controller/checkSession.php",
    type: "GET",
    cache: false,
    success: function(dataResult){
        var dataResult = JSON.parse(dataResult);
        if(dataResult.statusCode==200){
            var x = "";
            var y = "";
            var isiy = "";
            if(dataResult.role == 1){
                $.ajax({
                    url: "controller/cekStokHabis.php",
                    type: "GET",
                    cache: false,
                    success: function(dataResult2){
                        var dataResult2 = JSON.parse(dataResult2);
                        dataResult2.forEach(function(item) {
                            isiy += '<div class="row">';
                            isiy += '<div class="col">'+item.nama+'</div>'
                            isiy += '</div>';
                        });
                        y = `<div class="col-md-12">
                            <div class="card">
                                <div class="card-header" style="background-color: #5a85ff; color: white;">
                                    Stok Barang Habis
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        ${isiy}
                                    </li>
                                </ul>
                            </div>
                        </div>`;
                        $(".slide").hide();
                        $('#card-dashboard').append(y);
                    }
                });
                x = '<ul class="navbar-nav mr-auto">' +
                        '<li class="nav-item active">'+
                            '<a class="nav-link" href="index.php">Home</a>'+
                        '</li>'+
                        '<li class="nav-item">'+
                            '<a class="nav-link" href="view/master/menu.php">Menu</a>'+
                        '</li>'+
                        '<li class="nav-item">'+
                            '<a class="nav-link" href="view/master/bahan.php">Stok</a>'+
                        '</li>'+
                        '<li class="nav-item">'+
                            '<a class="nav-link" href="view/master/pelanggan.php">Pelanggan</a>'+
                        '</li>'+
                        '<li class="nav-item">'+
                            '<a class="nav-link" href="view/master/pesanan.php">Pesanan</a>'+
                        '</li>'+
                        '<li class="nav-item">'+
                            '<a class="nav-link" href="view/master/stok.php">Bahan</a>'+
                        '</li>'+
                        '<li class="nav-item">'+
                            '<a class="nav-link" href="view/master/laporan.php">Laporan</a>'+
                        '</li>'+
                        '<li class="nav-item dropdown">'+
                            '<a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
                                dataResult.username+
                            '</a>'+
                            '<div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">'+
                                '<a class="dropdown-item" href="controller/logout.php">Logout</a>'+
                            '</div>'+
                        '</li>'+
                    '</ul>';
            }else if (dataResult.role == 2){
                $.ajax({
                    url: "controller/cekPesananBelumBayar.php",
                    type: "GET",
                    cache: false,
                    success: function(dataResult2){
                        var dataResult2 = JSON.parse(dataResult2);
                        dataResult2.forEach(function(item) {
                            isiy += '<div class="row">';
                            isiy += '<div class="col">'+item.nama+'</div>'
                            isiy += '<div class="col">'+item.jumlah+' porsi</div>'
                            isiy += '</div>';
                        });
                        y = `<div class="col-md-12">
                            <div class="card">
                                <div class="card-header" style="background-color: #5a85ff; color: white;">
                                    Pesanan Belum Bayar
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        ${isiy}
                                    </li>
                                </ul>
                            </div>
                        </div>`;
                        $(".slide").hide();
                        $('#card-dashboard').append(y);
                    }
                });
                x = '<ul class="navbar-nav mr-auto">' +
                        '<li class="nav-item active">'+
                            '<a class="nav-link" href="index.php">Home</a>'+
                        '</li>'+
                        '<li class="nav-item">'+
                            '<a class="nav-link" href="view/master/menu.php">Menu</a>'+
                        '</li>'+
                        '<li class="nav-item">'+
                            '<a class="nav-link" href="view/master/pesanan.php">Pesanan</a>'+
                        '</li>'+
                        '<li class="nav-item dropdown">'+
                            '<a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
                                dataResult.username+
                            '</a>'+
                            '<div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">'+
                                '<a class="dropdown-item" href="controller/logout.php">Logout</a>'+
                            '</div>'+
                        '</li>'+
                    '</ul>';
            }else{
                x = '<ul class="navbar-nav mr-auto">' +
                        '<li class="nav-item active">'+
                            '<a class="nav-link" href="index.php">Home</a>'+
                        '</li>'+
                        '<li class="nav-item dropdown">'+
                            '<a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
                                dataResult.username+
                            '</a>'+
                            '<div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">'+
                                '<a class="dropdown-item" href="controller/logout.php">Logout</a>'+
                            '</div>'+
                        '</li>'+
                    '</ul>';
            }
            $('#navbarSupportedContent').append(x);
        }
        else if(dataResult.statusCode==201){
            $('#navbarSupportedContent').append(
                '<ul class="navbar-nav mr-auto">' +
                    '<li class="nav-item active">'+
                        '<a class="nav-link" href="index.php">Home<span class="sr-only">(current)</span></a>'+
                    '</li>'+
                    '<li class="nav-item">'+
                        '<a class="nav-link" href="view/auth/login.php">Login</a>'+
                    '</li>'+
                    '<li class="nav-item">'+
                        '<a class="nav-link" href="view/auth/register.php">Register</a>'+
                    '</li>'+
                '</ul>'
            );
        }
    }
});