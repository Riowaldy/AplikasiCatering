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
                <label for="menu_stok_tambah" class="control-label col-lg-6">Menu</label>
                <select class="form-control" id="menu_stok_tambah">
                </select>
                <span class="help-block" id="menu_stok_tambah_error"></span>
            </div>
            <div class="form-group">
                <label for="bahan_stok_tambah" class="control-label col-lg-6">Bahan</label>
                <select class="form-control" id="bahan_stok_tambah">
                </select>
                <span class="help-block" id="bahan_stok_tambah_error"></span>
            </div>
            <div class="form-group">
                <label for="jumlah_stok_tambah" class="control-label col-lg-6">Jumlah</label>
                <input type="number" step=".01" name="jumlah_stok_tambah" class="form-control" id="jumlah_stok_tambah" required autocomplete="off">
                <span class="help-block" id="jumlah_stok_tambah_error"></span>
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
                <label for="menu_stok" class="control-label col-lg-10">Menu</label>
                <select class="form-control" id="menu_stok" readonly disabled>
                </select>
                <span class="help-block" id="menu_stok_error"></span>
            </div>
            <div class="form-group">
                <label for="bahan_stok" class="control-label col-lg-10">Bahan</label>
                <select class="form-control" id="bahan_stok" readonly disabled>
                </select>
                <span class="help-block" id="bahan_stok_error"></span>
            </div>
            <div class="form-group">
                <label for="jumlah_stok" class="control-label col-lg-10">Jumlah</label>
                <input type="number" step=".01" name="jumlah_stok" class="form-control" id="jumlah_stok" required autocomplete="off">
                <span class="help-block" id="jumlah_stok_error"></span>
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