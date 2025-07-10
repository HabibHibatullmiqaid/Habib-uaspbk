Proyek Website Informasi Pulau Natuna
Proyek ini adalah sebuah aplikasi web informatif yang dibangun sebagai studi kasus untuk tugas mata kuliah Pemrograman Berbasis Komponen. Aplikasi ini berfungsi sebagai portal digital untuk memperkenalkan pesona wisata, kuliner, dan artikel menarik seputar Kepulauan Natuna.

1. Studi Kasus: Portal Informasi Digital
Studi Kasus: Sistem Informasi Pariwisata "Info Pulau Natuna".

Ruang Lingkup:
Aplikasi ini dirancang untuk menjadi sumber informasi utama bagi calon wisatawan atau siapa saja yang tertarik dengan Kepulauan Natuna. Sistem ini memiliki dua sisi:

Sisi Publik: Dapat diakses oleh semua pengguna untuk melihat informasi destinasi, kuliner, dan artikel.

Sisi Admin: Sebuah dashboard khusus yang dilindungi oleh login untuk mengelola (menambah, mengubah, menghapus) konten yang ditampilkan di sisi publik.

Kompleksitas sistem ini mencakup manajemen data dinamis, routing untuk berbagai halaman, manajemen state untuk data API, dan fitur autentikasi sederhana untuk admin.

2. Analisis Fitur dan Menu
Fitur Utama
Tampilan Publik:

Halaman Utama (Homepage) dengan destinasi unggulan.

Halaman Daftar Destinasi.

Halaman Detail Destinasi.

Halaman Daftar Kuliner.

Halaman Detail Kuliner.

Halaman Daftar Artikel.

Halaman Detail Artikel.

Halaman "Tentang Kami".

Sistem Ulasan Pengguna dengan rating bintang.

Fitur Admin:

Halaman Login khusus untuk admin.

Dashboard Admin yang dilindungi (tidak bisa diakses sebelum login).

Manajemen Data (CRUD - Create, Read, Update, Delete) untuk destinasi.

Manajemen Data (CRUD) untuk kuliner.

Fungsi Logout.

Struktur Menu Navigasi
Navbar Publik:

Home

Destinasi

Kuliner

Artikel

Tentang

Dashboard Admin:

Tab Manajemen Destinasi

Tab Manajemen Kuliner

3. Perancangan Struktur Routing
Aplikasi ini menggunakan Vue Router dengan mode history untuk navigasi yang bersih tanpa tanda # di URL.

/: Halaman Utama (HomeView.vue)

/destinasi: Halaman Daftar Destinasi (DestinationsView.vue)

/destinasi/:id: Halaman Detail Destinasi (DetailView.vue)

/kuliner: Halaman Daftar Kuliner (KulinerList.vue)

/kuliner/:id: Halaman Detail Kuliner (KulinerDetail.vue)

/artikel: Halaman Daftar Artikel (ArticleListView.vue)

/artikel/:id: Halaman Detail Artikel (ArticleDetailView.vue)

/tentang: Halaman Tentang Kami (AboutView.vue)

/admin/login: Halaman Login untuk Admin (AdminLogin.vue)

/admin/dashboard: Halaman Dashboard Admin (AdminDashboard.vue), dilindungi oleh Navigation Guard.

4. Konsumsi API dengan json-server
Aplikasi ini tidak menggunakan data statis. Semua konten dinamis (destinasi, kuliner, artikel, ulasan) dikelola melalui RESTful API palsu yang dibuat menggunakan json-server.

Database: Data disimpan dalam file db.json.

Komunikasi: Komponen Vue berkomunikasi dengan API melalui Pinia store.

Library: Axios digunakan di dalam actions Pinia untuk melakukan request HTTP (GET, POST, PUT, DELETE) ke json-server.

5. Manajemen State dengan Pinia
Pinia digunakan sebagai pusat manajemen state (Single Source of Truth) untuk seluruh aplikasi.

src/stores/natuna.js: Store ini bertanggung jawab untuk:

State: Menyimpan data destinations, kuliner, articles, reviews, dan status loading.

Actions: Berisi semua fungsi untuk berkomunikasi dengan API, seperti fetchData, fetchItemById, addReview, dan fungsi CRUD untuk admin.

Getters: Menyediakan data turunan, seperti featuredDestinations.

src/stores/auth.js: Store ini mengelola status login admin.

Dengan memusatkan logika data di Pinia, komponen menjadi lebih bersih dan hanya bertugas untuk menampilkan data atau memanggil actions.

6. Unit Testing dengan Vitest
Sesuai arahan tugas, proyek ini menyertakan unit test untuk menguji fungsionalitas Pinia store.

File Test: src/tests/stores/natuna.spec.js

Yang Diuji:

Memastikan state awal store sudah benar (kosong).

Memvalidasi bahwa action fetchDestinations berhasil mengambil data (dengan mocking axios) dan menyimpannya ke state.

Memastikan getter featuredDestinations berfungsi sesuai harapan.

Menguji skenario penanganan error saat API gagal merespons.

Cara Menjalankan Test:

npm run test:unit

Cara Menjalankan Proyek Secara Lokal
Pastikan Anda sudah menginstal Node.js dan npm.

1. Clone Repositori

git clone https://github.com/HabibHibatullmiqaid/T10PBK.git
cd T10PBK-main

2. Instal Dependensi
Jalankan perintah ini untuk mengunduh semua paket yang dibutuhkan.

npm install

3. Jalankan API Server
Buka terminal baru, arahkan ke folder proyek, dan jalankan json-server.

# Jika json-server belum terinstall global, jalankan: npm install -g json-server
npm run api

Biarkan terminal ini tetap berjalan. API Anda sekarang aktif di http://localhost:3000.

4. Jalankan Aplikasi Vue
Buka terminal lain, arahkan ke folder proyek, dan jalankan server pengembangan Vite.

npm run dev

Aplikasi Anda sekarang bisa diakses di alamat yang muncul di terminal (biasanya http://localhost:5173).

Akses Halaman Admin
Buka http://localhost:5173/admin/login.

Gunakan kredensial dari db.json (contoh: username admin, password admin123) untuk login.