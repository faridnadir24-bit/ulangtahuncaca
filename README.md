# Untuk Cacaaa ♡

Website kejutan ulang tahun bertema scrapbook pink pastel untuk Cantika ("Cacaaa"), dibangun dengan React, Vite, Tailwind CSS, Framer Motion, Lucide React, dan Canvas Confetti.

## Cara Mengedit Konten

Seluruh teks, foto, surat, doa, dan pengaturan lagu bisa diedit di satu file:

- [`src/data/birthdayConfig.js`](src/data/birthdayConfig.js)

### 1. Foto & Video
1. Taruh foto atau video ke folder `/public/images/memories/`.
2. Ubah daftar `memories.items` atau `memories.photobooth` di `src/data/birthdayConfig.js`.
3. Jika ada file foto yang tidak ditemukan, kartu pink pengganti akan muncul otomatis.

### 2. Lagu Latar
1. Secara default memutar **Selamat Ulang Tahun - Rizky Febian** lewat YouTube IFrame API (`HDRsMqNhMLc`), dengan cadangan audio lokal di `/public/music/panjang-umurnya-piano.wav` jika YouTube sedang tidak bisa diakses.
2. Jika ingin mengganti dengan link YouTube lain, ubah `music.youtubeId`, `music.youtubeUrl`, `music.title`, dan `music.subtitle` di `src/data/birthdayConfig.js`.

### 3. Menjalankan Lokal & Build
```bash
npm install
npm run dev
npm run build
```
