# HALLOUYUN GROUP - GitHub Pages PWA

Ini versi FIX siap upload ke GitHub biar jadi aplikasi.

## Isi file
- index.html = Kasir utama
- rental.html = Display rental / timer box
- manifest.json + manifest-rental.json = biar bisa Add to Home Screen
- sw.js = service worker biar offline & installable

## Cara upload ke GitHub (jadi aplikasi)
1. Buat repository baru di github.com, nama misal `hallouyun`
2. Upload semua file di folder ini ke root repository (jangan di dalam folder lagi)
3. Masuk Settings > Pages
4. Source: Deploy from a branch, Branch: main, folder: / (root)
5. Save, tunggu 1-2 menit, akan dapat link https://username.github.io/hallouyun/
6. Buka link di HP Chrome > titik 3 > Add to Home Screen / Install App
   Sekarang sudah jadi aplikasi standalone seperti APK

## Cara jadi APK beneran (opsional)
Buka https://www.pwabuilder.com/ masukkan link GitHub Pages kamu, nanti bisa generate APK/TWA.

## Fix yang dilakukan
- Ganti manifest data: URI yang ditolak browser jadi file manifest.json asli
- Tambah sw.js biar memenuhi syarat PWA installable
- Tambah theme-color & mobile-web-app-capable
- Service worker registration di kedua file

Firebase tetap pakai yang lama: hallouyun-1fdf9
