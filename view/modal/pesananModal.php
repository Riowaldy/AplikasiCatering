<!-- create -->
<form action="#" class="modal" tabindex="-1" role="dialog" id="form-tambah" novalidate="novalidate">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header" style="background-color: rgba(0, 120, 255, 1); color:white;">
            <h5 class="modal-title">Tambah Data Pesanan</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="form-group">
                <label for="pesanan_pesanan_tambah" class="control-label col-lg-6">Pesanan</label>
                <select class="form-control" id="pesanan_pesanan_tambah">
                </select>
                <span class="help-block" id="pesanan_pesanan_tambah_error"></span>
            </div>
            <div class="form-group">
                <label for="pelanggan_pesanan_tambah" class="control-label col-lg-6">Pelanggan</label>
                <select class="form-control" id="pelanggan_pesanan_tambah">
                </select>
                <span class="help-block" id="pelanggan_pesanan_tambah_error"></span>
            </div>
            <div class="form-group">
                <label for="jumlah_pesanan_tambah" class="control-label col-lg-6">Jumlah</label>
                <input type="number" name="jumlah_pesanan_tambah" class="form-control" id="jumlah_pesanan_tambah" required autocomplete="off">
                <span class="help-block" id="jumlah_pesanan_tambah_error"></span>
            </div>
            <div class="form-group">
                <label for="tanggal_pesanan_tambah" class="control-label col-lg-6">Tanggal Pesanan</label>
                <input type="datetime-local" name="tanggal_pesanan_tambah" class="form-control" id="tanggal_pesanan_tambah" required autocomplete="off">
                <span class="help-block" id="tanggal_pesanan_tambah_error"></span>
            </div>
            <div class="form-group text-center">
                <button type="button" class="btn btn-primary" id="btn-simpan-tambah">Simpan</button>
                <button type="button" class="btn btn-secondary" id="btn-reset-tambah" data-dismiss="modal">Batal</button>
            </div>
        </div>
      </div>
    </div>
</form>
<!-- end create -->

<!-- update -->
<form action="#" class="modal" tabindex="-1" role="dialog" id="form-edit" novalidate="novalidate">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header" style="background-color: rgba(0, 120, 255, 1); color:white;">
            <h5 class="modal-title">Edit Data Pesanan</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="form-group">
                <label for="pesanan_pesanan" class="control-label col-lg-10">Pesanan</label>
                <select class="form-control" id="pesanan_pesanan" readonly disabled>
                </select>
                <span class="help-block" id="pesanan_pesanan_error"></span>
            </div>
            <div class="form-group">
                <label for="pelanggan_pesanan" class="control-label col-lg-10">Pelanggan</label>
                <select class="form-control" id="pelanggan_pesanan" readonly disabled>
                </select>
                <span class="help-block" id="pelanggan_pesanan_error"></span>
            </div>
            <div class="form-group">
                <label for="jumlah_pesanan" class="control-label col-lg-10">Jumlah</label>
                <input type="number" name="jumlah_pesanan" class="form-control" id="jumlah_pesanan" required autocomplete="off">
                <span class="help-block" id="jumlah_pesanan_error"></span>
            </div>
            <div class="form-group">
                <label for="tanggal_pesanan" class="control-label col-lg-10">Tanggal Pesanan</label>
                <input type="datetime-local" name="tanggal_pesanan" class="form-control" id="tanggal_pesanan" required autocomplete="off">
                <span class="help-block" id="tanggal_pesanan_error"></span>
            </div>
            <div class="form-group text-center">
                <button type="button" class="btn btn-primary" id="btn-simpan-edit">Simpan</button>
                <button type="button" class="btn btn-secondary" id="btn-reset-edit" data-dismiss="modal">Batal</button>
            </div>
        </div>
      </div>
    </div>
</form>
<!-- end update -->