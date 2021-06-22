$.ajax({
    url: "../../controller/checkSession.php",
    type: "GET",
    cache: false,
    success: function(dataResult){
        var dataResult = JSON.parse(dataResult);
        if(dataResult.statusCode==200){
            location.href = "../index.php";
        }
        else if(dataResult.statusCode==201){
            $('#navbarSupportedContent').append(
                '<ul class="navbar-nav mr-auto">' +
                    '<li class="nav-item">'+
                        '<a class="nav-link" href="../../index.php">Home</a>'+
                    '</li>'+
                    '<li class="nav-item">'+
                        '<a class="nav-link" href="login.php">Login</a>'+
                    '</li>'+
                    '<li class="nav-item active">'+
                        '<a class="nav-link" href="register.php">Register</a>'+
                    '</li>'+
                '</ul>'
            );
        }
    }
});