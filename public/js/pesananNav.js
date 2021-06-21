$.ajax({
    url: "../../controller/checkSession.php",
    type: "GET",
    cache: false,
    success: function(dataResult){
        var dataResult = JSON.parse(dataResult);
        if(dataResult.statusCode==200){
            var x = "";
            if(dataResult.role == 1){
                x ='<ul class="navbar-nav mr-auto">' +
                        '<li class="nav-item">'+
                            '<a class="nav-link" href="../../index.php">Home</a>'+
                        '</li>'+
                        '<li class="nav-item">'+
                            '<a class="nav-link" href="menu.php">Menu</a>'+
                        '</li>'+
                        '<li class="nav-item">'+
                            '<a class="nav-link" href="bahan.php">Bahan</a>'+
                        '</li>'+
                        '<li class="nav-item">'+
                            '<a class="nav-link" href="pelanggan.php">Pelanggan</a>'+
                        '</li>'+
                        '<li class="nav-item active">'+
                            '<a class="nav-link" href="pesanan.php">Pesanan</a>'+
                        '</li>'+
                        '<li class="nav-item">'+
                            '<a class="nav-link" href="stok.php">Stok</a>'+
                        '</li>'+
                        '<li class="nav-item dropdown">'+
                            '<a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
                                dataResult.username+
                            '</a>'+
                            '<div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">'+
                                '<a class="dropdown-item" href="../../controller/logout.php">Logout</a>'+
                            '</div>'+
                        '</li>'+
                    '</ul>'
            }else if (dataResult.role == 2){
                x ='<ul class="navbar-nav mr-auto">' +
                        '<li class="nav-item">'+
                            '<a class="nav-link" href="../../index.php">Home</a>'+
                        '</li>'+
                        '<li class="nav-item">'+
                            '<a class="nav-link" href="menu.php">Menu</a>'+
                        '</li>'+
                        '<li class="nav-item active">'+
                            '<a class="nav-link" href="pesanan.php">Pesanan</a>'+
                        '</li>'+
                        '<li class="nav-item dropdown">'+
                            '<a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
                                dataResult.username+
                            '</a>'+
                            '<div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">'+
                                '<a class="dropdown-item" href="../../controller/logout.php">Logout</a>'+
                            '</div>'+
                        '</li>'+
                    '</ul>'
            }else{
                x ='<ul class="navbar-nav mr-auto">' +
                        '<li class="nav-item">'+
                            '<a class="nav-link" href="../../index.php">Home</a>'+
                        '</li>'+
                        '<li class="nav-item dropdown">'+
                            '<a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
                                dataResult.username+
                            '</a>'+
                            '<div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">'+
                                '<a class="dropdown-item" href="../../controller/logout.php">Logout</a>'+
                            '</div>'+
                        '</li>'+
                    '</ul>'
            }
            $('#navbarSupportedContent').append(x);
        }
        else if(dataResult.statusCode==201){
            location.href = "../../view/login.php";
        }
    }
});