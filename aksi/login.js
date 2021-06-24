$(document).ready(function() {
	$('#btnLogin').on('click', function() {
		var username = $('#username').val();
		var password = $('#password').val();
		if(username!="" && password!=""){
			$.ajax({
				url: "../../controller/getLogin.php",
				type: "POST",
				data: {
					type:2,
					username: username,
					password: password						
				},
				cache: false,
				success: function(dataResult){
                    var dataResult = JSON.parse(dataResult);
					if(dataResult.statusCode==200){
						location.href = "../../index.php";						
					}
					else if(dataResult.statusCode==201){
                        swal({
							title: "Error!",
							text : "Username / Password Salah",
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