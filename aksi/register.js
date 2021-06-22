$(document).ready(function() {
	$('#btnRegister').on('click', function() {
		var username = $('#username').val();
		var password = $('#password').val();
        var konfirmasipassword = $('#konfirmasipassword').val();
		if(username!="" && password!=""){
			$.ajax({
				url: "../../controller/getRegister.php",
				type: "POST",
				data: {
					type:2,
					username: username,
					password: password,
                    konfirmasipassword: konfirmasipassword						
				},
				cache: false,
				success: function(dataResult){
                    var dataResult = JSON.parse(dataResult);
					if(dataResult.statusCode==200){
						location.href = "../auth/login.php";						
					}
                    else if(dataResult.statusCode==202){
                        swal({
							title: "Error!",
							text : "Username Sudah Terdaftar",
							confirmButtonColor: "#EF5350",
							type : "error",
						});
					}
                    else if(dataResult.statusCode==203){
                        swal({
							title: "Error!",
							text : "Konfirmasi Password Tidak Sesuai",
							confirmButtonColor: "#EF5350",
							type : "error",
						});
					}
                    else {
                        swal({
							title: "Error!",
							text : "Gagal Mendaftarkan User",
							confirmButtonColor: "#EF5350",
							type : "error",
						});
					}
				}
			});
		}
		else{
			alert('Isi semua data !');
		}
	});
});