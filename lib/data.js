// Gelanggang Petang — lapangan futsal fiktif untuk purwarupa booking.
import { acak, hariKe } from './waktu';

export const arena = {
  name: 'Gelanggang Petang',
  tagline: 'Tiga lapangan indoor untuk main sepulang kerja',
  url: 'https://reservasi-futsal.vercel.app',
  jam: 'Setiap hari, 15.00–24.00',
  maksSlot: 4, // jam per pemesanan
};

export const nav = [
  { href: '/', label: 'Booking' },
  { href: '/harga', label: 'Harga & aturan' },
  { href: '/sparring', label: 'Cari lawan' },
  { href: '/jadwal-saya', label: 'Jadwal saya' },
];

export const courts = [
  { id: 'A', name: 'Lapangan A', type: 'Vinyl', ukuran: '25 × 15 m', catatan: 'Pantulan bola paling stabil — favorit untuk latihan tim.' },
  { id: 'B', name: 'Lapangan B', type: 'Interlock', ukuran: '25 × 15 m', catatan: 'Lantai modular, sedikit lebih cepat.' },
  { id: 'C', name: 'Lapangan C', type: 'Rumput sintetis', ukuran: '28 × 16 m', catatan: 'Paling luas; pakai sepatu turf, bukan sol karet rata.' },
];

// Jam mulai tiap slot (satu jam).
export const hours = ['15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

// Harga per jam: siang, jam emas (18–21), malam; akhir pekan (Sab–Min) lebih mahal.
export const TARIF = {
  siang: { label: 'Sore 15.00–17.59', biasa: 110000, akhirPekan: 130000 },
  emas: { label: 'Jam emas 18.00–21.59', biasa: 160000, akhirPekan: 180000 },
  malam: { label: 'Malam 22.00–24.00', biasa: 130000, akhirPekan: 150000 },
};
const golongan = (jam) => (jam >= '18:00' && jam < '22:00' ? 'emas' : jam >= '22:00' ? 'malam' : 'siang');
export const akhirPekan = (tanggal) => [0, 6].includes(hariKe(tanggal));
export const hargaSlot = (tanggal, jam) => TARIF[golongan(jam)][akhirPekan(tanggal) ? 'akhirPekan' : 'biasa'];
export const golonganJam = golongan;

// Slot yang sudah dibooking tim lain (contoh) — lebih ramai di jam emas & akhir pekan.
export function terisiContoh(tanggal) {
  const s = new Set();
  for (const c of courts) for (const h of hours) {
    const p = (golongan(h) === 'emas' ? 0.55 : golongan(h) === 'malam' ? 0.3 : 0.2) + (akhirPekan(tanggal) ? 0.15 : 0);
    if (acak(`${tanggal}|${c.id}|${h}`) < p) s.add(`${c.id}-${h}`);
  }
  return s;
}

export const aturan = [
  'Datang 10 menit sebelum jam main; jam selesai tidak diperpanjang bila terlambat.',
  'Sepatu futsal bersol karet untuk lapangan A dan B, sepatu turf untuk lapangan C.',
  'Bola disediakan; rompi pembeda tim dipinjamkan gratis.',
  'Pembatalan gratis sampai 24 jam sebelum main.',
];
export const fasilitas = ['Ruang ganti & pancuran', 'Loker', 'Parkir motor dan mobil', 'Kantin', 'Tribun kecil di lapangan C'];

// Papan cari lawan (contoh, fiktif).
export const sparringContoh = [
  { id: 's1', tim: 'Kantor Lantai Tujuh', level: 'Santai', hariKe: 2, jam: '19:00', lapangan: 'A', catatan: 'Usia 25–40, main bersih, kalah traktir es teh.' },
  { id: 's2', tim: 'FC Gang Kenanga', level: 'Menengah', hariKe: 3, jam: '20:00', lapangan: 'C', catatan: 'Butuh lawan tetap tiap minggu.' },
  { id: 's3', tim: 'Alumni SMA Angkatan 15', level: 'Santai', hariKe: 5, jam: '18:00', lapangan: 'B', catatan: 'Ada pemain cadangan, boleh campur.' },
  { id: 's4', tim: 'Tim Ojek Pangkalan Utara', level: 'Kompetitif', hariKe: 6, jam: '21:00', lapangan: 'A', catatan: 'Persiapan turnamen antarkampung.' },
];
export const LEVEL = ['Santai', 'Menengah', 'Kompetitif'];
