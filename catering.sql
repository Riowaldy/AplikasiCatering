-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 22 Jun 2021 pada 12.53
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
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `stok` double(11,1) NOT NULL,
  `satuan` varchar(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `bahan`
--

INSERT INTO `bahan` (`id`, `nama`, `stok`, `satuan`, `created_at`, `updated_at`) VALUES
(1, 'Beras', 3250.0, 'gram', '2021-06-21 05:34:14', '2021-06-21 22:49:01'),
(2, 'Gula', 5000.0, 'gram', '2021-06-21 05:34:25', '2021-06-21 22:38:26'),
(3, 'Minyak', 8.8, 'liter', '2021-06-21 05:34:40', '2021-06-21 22:48:36'),
(4, 'Garam', 1878.5, 'gram', '2021-06-21 05:35:29', '2021-06-21 22:49:01'),
(5, 'Mie', 50.0, 'pcs', '2021-06-21 05:36:15', '2021-06-21 05:36:15'),
(6, 'Ayam', 9710.0, 'gram', '2021-06-21 05:36:24', '2021-06-21 22:49:01'),
(7, 'Micin', 500.0, 'gram', '2021-06-21 05:48:32', '2021-06-20 20:07:18'),
(8, 'Kecap', 8.6, 'liter', '2021-06-21 20:49:21', '2021-06-21 22:48:49');

-- --------------------------------------------------------

--
-- Struktur dari tabel `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `harga` int(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `menu`
--

INSERT INTO `menu` (`id`, `nama`, `harga`, `created_at`, `updated_at`) VALUES
(1, 'Nasi Goreng', 12000, '2021-06-14 07:50:55', '2021-06-14 07:50:55'),
(3, 'Sate Ayam', 15000, '2021-06-14 03:23:05', '2021-06-20 21:26:29'),
(4, 'Soto Ayam', 12000, '2021-06-20 21:28:06', '2021-06-20 21:28:22');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pesanan`
--

CREATE TABLE `pesanan` (
  `id` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `tanggal` timestamp NULL DEFAULT NULL,
  `status` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `pesanan`
--

INSERT INTO `pesanan` (`id`, `menu_id`, `user_id`, `jumlah`, `tanggal`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 12, '2021-06-26 10:43:00', 0, '2021-06-21 22:40:59', '2021-06-21 22:48:36'),
(2, 3, 2, 14, '2021-07-02 10:48:00', 0, '2021-06-21 22:48:49', '2021-06-21 22:48:49'),
(3, 4, 3, 15, '2021-06-15 10:48:00', 0, '2021-06-21 22:49:01', '2021-06-21 22:49:01');

-- --------------------------------------------------------

--
-- Struktur dari tabel `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `role`
--

INSERT INTO `role` (`id`, `nama`, `created_at`, `updated_at`) VALUES
(1, 'admin', '2021-06-14 14:25:02', '2021-06-14 14:25:02'),
(2, 'pelanggan', '2021-06-14 14:25:02', '2021-06-14 14:25:02');

-- --------------------------------------------------------

--
-- Struktur dari tabel `stok`
--

CREATE TABLE `stok` (
  `id` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL,
  `bahan_id` int(11) NOT NULL,
  `jumlah` decimal(11,1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `stok`
--

INSERT INTO `stok` (`id`, `menu_id`, `bahan_id`, `jumlah`, `created_at`, `updated_at`) VALUES
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
(13, 4, 4, '0.1', '2021-06-21 20:50:14', '2021-06-21 20:50:14');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `created_at`, `updated_at`) VALUES
(1, 'admin', '12345', '2021-06-08 06:36:50', '2021-06-08 06:36:50'),
(2, 'Pelanggan 1', '12345', '2021-06-14 14:26:11', '2021-06-14 14:26:11'),
(3, 'Pelanggan 2', '12345', '2021-06-14 14:26:35', '2021-06-14 14:26:35');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_role`
--

CREATE TABLE `user_role` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user_role`
--

INSERT INTO `user_role` (`id`, `user_id`, `role_id`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 2);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `bahan`
--
ALTER TABLE `bahan`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `pesanan`
--
ALTER TABLE `pesanan`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `stok`
--
ALTER TABLE `stok`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `bahan`
--
ALTER TABLE `bahan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `pesanan`
--
ALTER TABLE `pesanan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `stok`
--
ALTER TABLE `stok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `user_role`
--
ALTER TABLE `user_role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
