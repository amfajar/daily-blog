# [AMFAJAR BLOG](https://github.com/amfajar/daily-blog)

> A clean and beautiful Astro static blog theme, personalized for the AMFAJAR branding.

[**English**](#english) | [**Bahasa Indonesia**](#bahasa-indonesia)

---

<a name="english"></a>
## 🇬🇧 English

### ✨ Features
- **Astro + Tailwind CSS** - Ultra-fast static site generation.
- **Multi-Repo Content** - Powered by a separate [vault repository](https://github.com/amfajar/blog-contents) for streamlined content management.
- **Shortened Permalinks** - Clean, title-based slugs for all posts.
- **Cloudflare Pages Ready** - Automated deployment with custom build scripts.
- **Internationalization** - Full support for English and Indonesian.
- **Responsive Design** - Optimized for desktop, tablet, and mobile.

### 🚀 Quick Start
1. **Clone the repository:**
   ```bash
   git clone https://github.com/amfajar/daily-blog.git
   cd daily-blog
   ```
2. **Install dependencies:**
   ```bash
   pnpm install
   ```
3. **Fetch contents:**
   ```bash
   pnpm run fetch-contents
   ```
4. **Develop locally:**
   ```bash
   pnpm dev
   ```

### 🛠 Configuration
Settings are located in `src/config/`. The blog automatically fetches content from the `vault` directory during the build process.

---

<a name="bahasa-indonesia"></a>
## 🇮🇩 Bahasa Indonesia

### ✨ Fitur Utama
- **Astro + Tailwind CSS** - Pembuatan situs statis yang sangat cepat.
- **Konten Multi-Repo** - Konten dikelola di [repo vault](https://github.com/amfajar/blog-contents) terpisah untuk kemudahan manajemen.
- **Permalink Ringkas** - Slug URL berdasarkan judul postingan.
- **Siap untuk Cloudflare Pages** - Deployment otomatis dengan skrip build khusus.
- **Internasionalisasi** - Mendukung Bahasa Inggris dan Bahasa Indonesia.
- **Desain Responsif** - Optimal untuk desktop, tablet, dan smartphone.

### 🚀 Panduan Cepat
1. **Clone repositori:**
   ```bash
   git clone https://github.com/amfajar/daily-blog.git
   cd daily-blog
   ```
2. **Instal dependensi:**
   ```bash
   pnpm install
   ```
3. **Ambil konten (fetch):**
   ```bash
   pnpm run fetch-contents
   ```
4. **Jalankan lokal:**
   ```bash
   pnpm dev
   ```

### 🛠 Konfigurasi
Pengaturan tersedia di folder `src/config/`. Blog ini akan mengambil konten dari direktori `vault` secara otomatis saat proses build.

---

## 📝 License
This project is based on the [Firefly](https://github.com/CuteLeaf/Firefly) theme (which is based on [Fuwari](https://github.com/saicaca/fuwari)).
Licensed under the [MIT License](./LICENSE).

Copyright (c) 2025 [AMFAJAR](https://github.com/amfajar)
