# Revive Hero

Aplikasi Revive Hero adalah platform pertolongan pertama berbasis web yang membantu pengguna untuk mendapatkan penanganan cepat dalam situasi darurat.

## Fitur Utama

- **Autentikasi Pengguna**: Sistem pendaftaran dan login yang aman dengan NextAuth.js
- **Pengelolaan Profil**: Pengguna dapat mengelola data pribadi dan kontak darurat
- **Notifikasi**: Sistem notifikasi toast untuk memberi informasi kepada pengguna
- **Responsif**: Antarmuka yang nyaman digunakan di berbagai perangkat

## Teknologi yang Digunakan

- **Frontend**: Next.js 15, React 19, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL dengan Prisma ORM
- **Autentikasi**: NextAuth.js

## Cara Menjalankan Aplikasi

### Prasyarat
- Node.js versi 18.0 atau lebih tinggi
- npm atau yarn
- PostgreSQL

### Langkah-langkah Instalasi

1. Clone repositori ini:
```bash
git clone https://github.com/yourusername/revive-hero.git
cd revive-hero
```

2. Instal dependensi:
```bash
npm install
# atau
yarn install
```

3. Buat file .env

4. Siapkan database dengan Prisma:
```bash
npx prisma migrate dev
```

5. Jalankan server pengembangan:
```bash
npm run dev
# atau
yarn dev
```

6. Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat aplikasi.

## Struktur Proyek

- `/app` - Semua halaman dan komponen aplikasi
  - `/(root)` - Halaman publik (landing page, login, register)
  - `/(dashboard)` - Halaman yang memerlukan autentikasi
  - `/api` - API routes untuk backend
- `/components` - Komponen UI yang dapat digunakan kembali
- `/lib` - Utilitas dan konfigurasi
- `/prisma` - Model database dan migrasi

## Deployment

Aplikasi ini di-deploy menggunakan Vercel.


