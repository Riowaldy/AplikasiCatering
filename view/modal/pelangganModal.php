<!-- create -->
<form action="#" class="modal" tabindex="-1" role="dialog" id="form-tambah" novalidate="novalidate">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header" style="background-color: rgba(0, 120, 255, 1); color:white;">
            <h5 class="modal-title">Tambah Data Pelanggan</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="form-group">
                <label for="username_pelanggan_tambah" class="control-label col-lg-2">Username</label>
                <input type="text" name="username_pelanggan_tambah" class="form-control" id="username_pelanggan_tambah" required autocomplete="off">
                <span class="help-block" id="username_pelanggan_tambah_error"></span>
            </div>
            <div class="form-group">
                <label for="nohp_pelanggan_tambah" class="control-label col-lg-10">Nomor HP</label>
                <input type="text" name="nohp_pelanggan_tambah" class="form-control" id="nohp_pelanggan_tambah" required autocomplete="off">
                <span class="help-block" id="nohp_pelanggan_tambah_error"></span>
            </div>
            <div class="form-group">
                <label for="password_pelanggan_tambah" class="control-label col-lg-2">Password</label>
                <input type="text" name="password_pelanggan_tambah" class="form-control" id="password_pelanggan_tambah" required autocomplete="off">
                <span class="help-block" id="password_pelanggan_tambah_error"></span>
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
            <h5 class="modal-title">Edit Data Pelanggan</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="form-group">
                <label for="username_pelanggan" class="control-label col-lg-2">Username</label>
                <input type="text" name="username_pelanggan" class="form-control" id="username_pelanggan" required autocomplete="off">
                <span class="help-block" id="username_pelanggan_error"></span>
            </div>
            <div class="form-group">
                <label for="nohp_pelanggan" class="control-label col-lg-10">Nomor HP</label>
                <input type="text" name="nohp_pelanggan" class="form-control" id="nohp_pelanggan" required autocomplete="off">
                <span class="help-block" id="nohp_pelanggan_error"></span>
            </div>
            <div class="form-group">
                <label for="password_pelanggan" class="control-label col-lg-2">Password</label>
                <input type="text" name="password_pelanggan" class="form-control" id="password_pelanggan" required autocomplete="off">
                <span class="help-block" id="password_pelanggan_error"></span>
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