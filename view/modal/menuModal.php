<!-- create -->
<form action="#" class="modal" tabindex="-1" role="dialog" id="form-tambah" novalidate="novalidate">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header" style="background-color: rgba(0, 120, 255, 1); color:white;">
            <h5 class="modal-title">Tambah Data Menu</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="form-group">
                <label for="nama_menu_tambah" class="control-label col-lg-2">Nama</label>
                <input type="text" name="nama_menu_tambah" class="form-control" id="nama_menu_tambah" required autocomplete="off">
                <span class="help-block" id="nama_menu_tambah_error"></span>
            </div>
            <div class="form-group">
                <label for="harga_menu_tambah" class="control-label col-lg-2">Harga</label>
                <input type="number" name="harga_menu_tambah" class="form-control" id="harga_menu_tambah" required autocomplete="off">
                <span class="help-block" id="harga_menu_tambah_error"></span>
            </div>
            <div class="form-group">
                <label for="gambar_menu_tambah" class="control-label col-lg-2">Gambar</label>
                <input type="file" class="form-control" accept="image/*" name="image" id="gambar_menu_tambah">
                <span class="help-block" id="gambar_menu_tambah_error"></span>
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
            <h5 class="modal-title">Edit Data Menu</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="form-group">
                <label for="nama_menu" class="control-label col-lg-2">Nama</label>
                <input type="text" name="nama_menu" class="form-control" id="nama_menu" required autocomplete="off">
                <span class="help-block" id="nama_menu_error"></span>
            </div>
            <div class="form-group">
                <label for="harga_menu" class="control-label col-lg-2">Harga</label>
                <input type="number" name="harga_menu" class="form-control" id="harga_menu" required autocomplete="off">
                <span class="help-block" id="harga_menu_error"></span>
            </div>
            <div class="form-group">
                <label for="gambar_menu" class="control-label col-lg-2">Gambar</label>
                <input type="file" class="form-control" accept="image/*" name="image" id="gambar_menu">
                <span class="help-block" id="gambar_menu_error"></span>
            </div>
            <div class="form-group text-center">
                <button type="button" class="btn btn-primary" id="btn-simpan-edit">Simpan</button>
                <button type="button" class="btn btn-secondary" id="btn-reset-edit" data-dismiss="modal">Batal</button>
            </div>
        </div>
      </div>
    </div>
</form>

<form action="#" class="modal" tabindex="-1" role="dialog" id="form-zoom" novalidate="novalidate">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header" style="background-color: rgba(0, 120, 255, 1); color:white;">
            <h5 class="modal-title">Gambar Menu</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="text-center">
                <div class="form-group" id="bukti_zoom">
                </div>
            </div>
            <div class="form-group text-center">
                <button type="button" class="btn btn-secondary" id="btn-reset-bukti" data-dismiss="modal">Close</button>
            </div>
        </div>
      </div>
    </div>
</form>
<!-- end update -->