<?php include '../layout/header.php'; ?>
<link rel="stylesheet" href="../../public/css/data.css">

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="../../">Catering</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
    </div>
</nav>
<div class="section-body">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>Tabel Pesanan</h4>
                </div>
                <div class="d-flex flex-row-reverse" style="margin: 0 25px 0 25px;">
                    <a href="#tambah" class="btn btn-primary btn-raised btn-xs col-lg-1" data-toggle="modal" data-target="#form-tambah" id="btn-tambah"><i class=""></i>Tambah</a>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-striped text-center" id="pesanan">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Pesanan</th>
                                    <th>Pelanggan</th>
                                    <th>Jumlah</th>
                                    <th>Harga</th>
                                    <th>Tanggal Pesanan</th>
                                    <th>Bukti Bayar</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include '../modal/pesananModal.php'; ?>
<?php include '../layout/footer.php'; ?>
<script src="../../public/js/pesananNav.js"></script>
<script src="../../aksi/pesanan.js"></script>

        