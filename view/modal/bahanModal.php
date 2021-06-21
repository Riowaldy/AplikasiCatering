<!-- create -->
<form action="#" class="modal" tabindex="-1" role="dialog" id="form-tambah" novalidate="novalidate">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header" style="background-color: rgba(0, 120, 255, 1); color:white;">
            <h5 class="modal-title">Tambah Data Bahan</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="form-group">
                <label for="nama_bahan_tambah" class="control-label col-lg-2">Nama</label>
                <input type="text" name="nama_bahan_tambah" class="form-control" id="nama_bahan_tambah" required autocomplete="off">
                <span class="help-block" id="nama_bahan_tambah_error"></span>
            </div>
            <div class="form-group">
                <label for="stok_bahan_tambah" class="control-label col-lg-2">Stok</label>
                <input type="text" name="stok_bahan_tambah" class="form-control" id="stok_bahan_tambah" required autocomplete="off">
                <span class="help-block" id="stok_bahan_tambah_error"></span>
            </div>
            <div class="form-group">
                <label for="satuan_bahan_tambah" class="control-label col-lg-2">Satuan</label>
                <input type="text" name="satuan_bahan_tambah" class="form-control" id="satuan_bahan_tambah" required autocomplete="off">
                <span class="help-block" id="satuan_bahan_tambah_error"></span>
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
            <h5 class="modal-title">Edit Data Bahan</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="form-group">
                <label for="nama_bahan" class="control-label col-lg-2">Nama</label>
                <input type="text" name="nama_bahan" class="form-control" id="nama_bahan" required autocomplete="off">
                <span class="help-block" id="nama_bahan_error"></span>
            </div>
            <div class="form-group">
                <label for="stok_bahan" class="control-label col-lg-2">Stok</label>
                <input type="text" name="stok_bahan" class="form-control" id="stok_bahan" required autocomplete="off">
                <span class="help-block" id="stok_bahan_error"></span>
            </div>
            <div class="form-group">
                <label for="satuan_bahan" class="control-label col-lg-2">Satuan</label>
                <input type="text" name="satuan_bahan" class="form-control" id="satuan_bahan" required autocomplete="off">
                <span class="help-block" id="satuan_bahan_error"></span>
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