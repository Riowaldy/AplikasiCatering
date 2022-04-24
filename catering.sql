-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 24 Apr 2022 pada 19.15
-- Versi server: 10.4.14-MariaDB
-- Versi PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `catering`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `bahan`
--

CREATE TABLE `bahan` (
  `id_bahan` int(11) NOT NULL,
  `nama_bahan` varchar(255) NOT NULL,
  `stok_bahan` double(11,1) NOT NULL,
  `satuan` varchar(20) NOT NULL,
  `created_bahan` timestamp NULL DEFAULT NULL,
  `updated_bahan` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `bahan`
--

INSERT INTO `bahan` (`id_bahan`, `nama_bahan`, `stok_bahan`, `satuan`, `created_bahan`, `updated_bahan`) VALUES
(1, 'Beras', -235000.0, 'gram', '2021-06-21 05:34:14', '2022-03-16 00:34:02'),
(2, 'Gula', 50000.0, 'gram', '2021-06-21 05:34:25', '2022-01-26 02:57:30'),
(3, 'Minyak', 9866.0, 'liter', '2021-06-21 05:34:40', '2022-03-16 00:34:02'),
(4, 'Garam', 6495.0, 'gram', '2021-06-21 05:35:29', '2022-03-16 00:34:02'),
(5, 'Mie', 50000.0, 'pcs', '2021-06-21 05:36:15', '2022-01-26 02:58:06'),
(6, 'Ayam', -1200.0, 'gram', '2021-06-21 05:36:24', '2022-03-16 00:33:39'),
(7, 'Micin', 5000.0, 'gram', '2021-06-21 05:48:32', '2022-01-26 02:57:48'),
(8, 'Kecap', 4900.0, 'liter', '2021-06-21 20:49:21', '2022-03-16 00:33:39');

-- --------------------------------------------------------

--
-- Struktur dari tabel `menu`
--

CREATE TABLE `menu` (
  `id_menu` int(11) NOT NULL,
  `nama_menu` varchar(255) NOT NULL,
  `harga_menu` int(100) NOT NULL,
  `created_menu` timestamp NULL DEFAULT NULL,
  `updated_menu` timestamp NULL DEFAULT NULL,
  `gambar` varchar(225) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `menu`
--

INSERT INTO `menu` (`id_menu`, `nama_menu`, `harga_menu`, `created_menu`, `updated_menu`, `gambar`) VALUES
(1, 'Nasi Goreng', 13000, '2021-06-14 07:50:55', '2022-03-03 00:10:33', '5443233.jpeg'),
(3, 'Sate Ayam', 15000, '2021-06-14 03:23:05', '2022-02-15 19:43:35', '9736574.jpg'),
(4, 'Soto Ayam', 13000, '2021-06-20 21:28:06', '2022-02-15 19:43:28', '2855095.jpeg');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pesanan`
--

CREATE TABLE `pesanan` (
  `id_pesanan` int(11) NOT NULL,
  `id_menu` int(11) NOT NULL,
  `id_users` int(11) NOT NULL,
  `jumlah_pesanan` int(11) NOT NULL,
  `tanggal_pesanan` timestamp NULL DEFAULT NULL,
  `status_pesanan` int(11) NOT NULL,
  `created_pesanan` timestamp NULL DEFAULT NULL,
  `updated_pesanan` timestamp NULL DEFAULT NULL,
  `bukti` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `pesanan`
--

INSERT INTO `pesanan` (`id_pesanan`, `id_menu`, `id_users`, `jumlah_pesanan`, `tanggal_pesanan`, `status_pesanan`, `created_pesanan`, `updated_pesanan`, `bukti`) VALUES
(1, 3, 4, 40, '2022-03-18 13:22:00', 1, '2021-06-14 07:50:55', '2022-03-03 00:25:58', '613524bukti.jpg'),
(2, 1, 2, 100, '2022-03-17 12:33:00', 1, '2022-03-03 00:33:16', '2022-03-16 00:33:10', NULL),
(3, 3, 4, 1000, '2022-03-30 12:33:00', 1, '2022-03-16 00:33:31', '2022-03-16 00:33:39', NULL),
(4, 1, 4, 1000, '2022-04-08 12:33:00', 1, '2022-03-16 00:34:00', '2022-03-16 00:34:02', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `role`
--

CREATE TABLE `role` (
  `id_role` int(11) NOT NULL,
  `nama_role` varchar(100) NOT NULL,
  `created_role` timestamp NULL DEFAULT NULL,
  `updated_role` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `role`
--

INSERT INTO `role` (`id_role`, `nama_role`, `created_role`, `updated_role`) VALUES
(1, 'admin', '2021-06-14 14:25:02', '2021-06-14 14:25:02'),
(2, 'pelanggan', '2021-06-14 14:25:02', '2021-06-14 14:25:02');

-- --------------------------------------------------------

--
-- Struktur dari tabel `stok`
--

CREATE TABLE `stok` (
  `id_stok` int(11) NOT NULL,
  `id_menu` int(11) NOT NULL,
  `id_bahan` int(11) NOT NULL,
  `jumlah_stok` decimal(11,1) NOT NULL,
  `created_stok` timestamp NULL DEFAULT NULL,
  `updated_stok` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `stok`
--

INSERT INTO `stok` (`id_stok`, `id_menu`, `id_bahan`, `jumlah_stok`, `created_stok`, `updated_stok`) VALUES
(1, 1, 3, '0.1', '2021-06-20 20:10:49', '2021-06-20 20:10:49'),
(2, 1, 1, '250.0', '2021-06-20 20:11:23', '2021-06-20 20:11:23'),
(3, 1, 4, '10.0', '2021-06-20 20:11:51', '2021-06-20 20:11:51'),
(5, 2, 5, '1.0', '2021-06-20 20:12:19', '2021-06-20 20:12:19'),
(6, 2, 2, '2.0', '2021-06-20 20:12:36', '2021-06-20 20:40:55'),
(7, 2, 4, '2.0', '2021-06-20 20:12:53', '2021-06-20 20:41:05'),
(8, 2, 7, '1.0', '2021-06-20 20:12:59', '2021-06-20 20:12:59'),
(9, 3, 6, '10.0', '2021-06-21 20:48:36', '2021-06-21 20:48:36'),
(10, 3, 8, '0.1', '2021-06-21 20:49:35', '2021-06-21 20:49:35'),
(11, 4, 1, '250.0', '2021-06-21 20:49:48', '2021-06-21 20:49:48'),
(12, 4, 6, '10.0', '2021-06-21 20:50:01', '2021-06-21 20:50:01'),
(13, 4, 4, '10.0', '2021-06-21 20:50:14', '2022-03-03 00:28:12');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id_users` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nohp` varchar(20) NOT NULL,
  `created_users` timestamp NULL DEFAULT NULL,
  `updated_users` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id_users`, `username`, `password`, `nohp`, `created_users`, `updated_users`) VALUES
(1, 'admin', '123456', '0', '2021-06-08 06:36:50', '2021-06-08 06:36:50'),
(2, 'Pelanggan 1', '123456', '085156542326', '2021-06-14 14:26:11', '2021-06-14 14:26:11'),
(3, 'Pelanggan 2', '123456', '085156542326', '2021-06-14 14:26:35', '2021-06-14 14:26:35'),
(4, 'Rio', 'abcdef', '08999999999999', '2021-08-25 03:59:47', '2021-08-25 03:59:47'),
(5, 'Pelanggan 3', '123456', '0832523532532', '2022-03-03 00:06:53', '2022-03-03 00:06:53'),
(6, 'Pelanggan 4', '123456', '0814124124', '2022-03-03 00:19:31', '2022-03-03 00:19:31');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_role`
--

CREATE TABLE `user_role` (
  `id_user_role` int(11) NOT NULL,
  `id_users` int(11) NOT NULL,
  `id_role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user_role`
--

INSERT INTO `user_role` (`id_user_role`, `id_users`, `id_role`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 2),
(4, 4, 2),
(5, 5, 2),
(6, 6, 2);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `bahan`
--
ALTER TABLE `bahan`
  ADD PRIMARY KEY (`id_bahan`);

--
-- Indeks untuk tabel `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id_menu`);

--
-- Indeks untuk tabel `pesanan`
--
ALTER TABLE `pesanan`
  ADD PRIMARY KEY (`id_pesanan`);

--
-- Indeks untuk tabel `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id_role`);

--
-- Indeks untuk tabel `stok`
--
ALTER TABLE `stok`
  ADD PRIMARY KEY (`id_stok`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_users`);

--
-- Indeks untuk tabel `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id_user_role`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `bahan`
--
ALTER TABLE `bahan`
  MODIFY `id_bahan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `menu`
--
ALTER TABLE `menu`
  MODIFY `id_menu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `pesanan`
--
ALTER TABLE `pesanan`
  MODIFY `id_pesanan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `role`
--
ALTER TABLE `role`
  MODIFY `id_role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `stok`
--
ALTER TABLE `stok`
  MODIFY `id_stok` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id_users` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `user_role`
--
ALTER TABLE `user_role`
  MODIFY `id_user_role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
