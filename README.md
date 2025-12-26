# MBKM Lahan Kosong Monitoring System

<p align="center">
  <img src="web/public/greenfields.png" alt="Greenfields Logo" width="200" />
</p>

Sistem pemantauan komprehensif yang dirancang khusus untuk proyek **"Greenfields"**. Sistem ini mencakup Backend API yang handal, Dashboard Web yang interaktif, dan Aplikasi Mobile untuk pemantauan data produksi secara real-time.

---

## 📂 Struktur Proyek

Proyek ini menggunakan pendekatan **monorepo**, yang terbagi menjadi tiga bagian utama:

| Direktori     | Deskripsi                                                         | Teknologi Utama                                                                                                                                                                                                                                                                                         |
| :------------ | :---------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`server/`** | Backend REST API yang menangani logika bisnis dan database.       | ![NodeJS](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white) ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)  |
| **`web/`**    | Dashboard Web untuk administrator dan operator memantau produksi. | ![Next JS](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) |
| **`mobile/`** | Aplikasi Mobile untuk pemantauan praktis di mana saja.            | ![Expo](https://img.shields.io/badge/Expo-000000?style=flat&logo=expo&logoColor=white) ![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react&logoColor=61DAFB)                                                                                                         |

---

## 🚀 Cara Memulai (Getting Started)

### Prasyarat Software

Pastikan Anda telah menginstal software berikut sebelum memulai:

- **Node.js** (Disarankan versi LTS) ![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=social&logo=node.js)
- **npm** atau **pnpm** atau **yarn**
- **Docker** (Opsional, untuk menjalakan server dalam container)
- **Akun Supabase** (Untuk database cloud)

---

### 1. Backend Server (`server`)

Backend berfungsi sebagai pusat logika data, autentikasi, dan komunikasi dengan Supabase.

**Langkah Instalasi:**

1.  Masuk ke direktori server:
    ```bash
    cd server
    ```
2.  Instal dependensi (library):
    ```bash
    npm install
    # atau jika menggunakan pnpm
    pnpm install
    ```
3.  Buat file `.env` berdasarkan contoh `.env.example` dan isi dengan kredensial Supabase Anda:
    ```env
    SUPABASE_URL=url_supabase_anda
    SUPABASE_KEY=anon_key_supabase_anda
    PORT=7860
    ```
4.  Jalankan server mode pengembangan:
    ```bash
    npm run dev
    ```

Server akan berjalan di `http://localhost:7860` (atau port yang Anda konfigurasi).

### 2. Web Dashboard (`web`)

Dashboard web menyediakan antarmuka visual modern untuk memantau grafik produksi, mengelola Master Data (Group, Shift, Line), dan melihat laporan harian.

**Langkah Instalasi:**

1.  Masuk ke direktori web:
    ```bash
    cd web
    ```
2.  Instal dependensi:
    ```bash
    npm install
    # atau
    pnpm install
    ```
3.  Jalankan server pengembangan web:
    ```bash
    npm run dev
    ```

Buka browser dan kunjungi `http://localhost:3000` untuk melihat dashboard.

### 3. Mobile App (`mobile`)

Aplikasi mobile memungkinkan pengguna untuk melihat statistik kunci dan data produksi langsung dari smartphone mereka.

**Langkah Instalasi:**

1.  Masuk ke direktori mobile:
    ```bash
    cd mobile
    ```
2.  Instal dependensi:
    ```bash
    npm install
    # atau
    pnpm install
    ```
3.  Jalankan server Expo:
    ```bash
    npm start
    ```
4.  Scan QR code yang muncul menggunakan aplikasi **Expo Go** (tersedia di Android Play Store / iOS App Store) untuk menjalankan aplikasi di HP fisik Anda.

---

## 🐳 Dukungan Docker

Direktori `server` sudah dilengkapi dengan `Dockerfile` untuk kemudahan deployment menggunakan container.

Untuk membangun dan menjalankan server menggunakan Docker:

```bash
cd server
docker build -t mbkm-server .
docker run -p 7860:7860 mbkm-server
```

---

## 🛠️ Fitur Utama

- ✅ **Dashboard Real-time**: Grafik interaktif (Bar, Area, Pie Chart) yang terhubung langsung ke database.
- ✅ **Manajemen Master Data**: CRUD (Create, Read, Update, Delete) untuk Data Group, Shift, dan Production Line.
- ✅ **Pencatatan Operasi**: Input data produksi harian (Suhu, Berat, Kualitas, dll) dengan validasi.
- ✅ **Cross-Platform**: Akses data yang sama baik dari Web maupun Aplikasi Mobile.
- ✅ **Modern UI/UX**: Desain antarmuka yang bersih dan responsif menggunakan Tailwind CSS dan Shadcn UI.

---

## 🤝 Kontribusi

Jika Anda ingin berkontribusi pada pengembangan proyek ini:

1.  Clone repository ini.
2.  Buat branch baru untuk fitur Anda (`git checkout -b fitur/FiturKeren`).
3.  Commit perubahan Anda (`git commit -m 'Menambahkan FiturKeren'`).
4.  Push ke branch tersebut (`git push origin fitur/FiturKeren`).
5.  Buat Pull Request di repository utama.

---

**© 2025 MBKM Lahan Kosong Project**
