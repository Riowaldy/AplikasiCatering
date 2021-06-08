<?php include '../layout/header.php'; ?>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="../../">Catering</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
    </div>
</nav>
<div class="container">
    <div class="body">
        <div class="col-md-6 offset-md-3" style="margin-top:3em;">
            <form>
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" class="form-control" id="username" placeholder="Masukkan Username" autocomplete="off">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="Password" autocomplete="off">
                </div>
                <input type="button" class="btn btn-primary" id="btnLogin" value="Login"/>
            </form>
        </div>
    </div>
</div>
<?php include '../layout/footer.php'; ?>
<script src="../../public/js/loginNav.js"></script>
<script src="../../aksi/login.js"></script>