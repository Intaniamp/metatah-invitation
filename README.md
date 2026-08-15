# Undangan Mepandes - Intania & Cantika

Undangan digital React + Vite, mengikuti 4 layar desain: Cover, Salam, Acara, dan Rsvp.

## Menjalankan

```bash
npm install
npm run dev
```

## Struktur

```
public/                  <- taruh semua aset gambar & audio di sini
src/
  components/
    Cover.jsx / .css     <- layar pembuka "Buka Undangan"
    Salam.jsx / .css     <- sambutan Om Swastiastu + nama kedua putri
    Acara.jsx / .css     <- jadwal Mepandes & Resepsi + tombol lokasi
    Rsvp.jsx / .css       <- form konfirmasi kehadiran
    Peserta.jsx / .css   <- daftar ucapan & doa dari tamu
    MusicPlayer.jsx / .css <- tombol musik mengambang
  hooks/
    useGuestName.js      <- baca nama tamu dari URL, contoh: ?to=Budi
    useMusicPlayer.js    <- kontrol play/pause musik latar
  App.jsx                <- alur halaman (cover -> scroll konten)
  index.css              <- token warna, font, tekstur latar (global)
```

## Aset di `public/`

Sudah termasuk di dalam zip ini:

| File | Dipakai di | Keterangan |
| --- | --- | --- |
| `om.png` | Cover | logo/emblem Om |
| `metatah-top-left.png` | semua halaman | ornamen sudut kiri-atas |
| `metatah-top-right.png` | semua halaman | ornamen sudut kanan-atas |
| `metatah-bottom-left.png` | semua halaman | ornamen sudut kiri-bawah |
| `metatah-bottom-right.png` | semua halaman | ornamen sudut kanan-bawah |
| `watercolor-bg.jpg` | semua halaman | tekstur latar cat air, di-tile vertikal (`.paper-bg` di `index.css`) |

Masih perlu kamu tambahkan sendiri:

| File | Dipakai di | Keterangan |
| --- | --- | --- |
| `favicon.svg` | tab browser | |
| `intania.jpeg`, `cantika.jpeg` | (opsional, belum dipakai di UI) | disiapkan bila nanti mau tampilkan foto |
| `music-on.png`, `music-off.png` | MusicPlayer | ikon toggle musik |
| `Bali Shanti.mp3` | MusicPlayer | musik latar, diputar loop |

Ganti path di komponen/CSS kalau nama file kamu berbeda.

## Nama tamu personalisasi

Link undangan bisa dipersonalisasi lewat query string, contoh:

```
https://domainmu.com/?to=Budi%20Santoso
```

Kalau parameter `to` kosong, akan fallback ke "Tamu Undangan".

## Konfirmasi kehadiran (Rsvp)

`handleRsvpSubmit` di `App.jsx` saat ini hanya menyimpan data ke state lokal
(`wishes`) supaya langsung muncul di `Peserta`. Untuk penyimpanan permanen,
ganti isi fungsi itu dengan request ke backend/Google Sheet/Firebase kamu.
