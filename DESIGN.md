# Arena Futsal Garuda — Design System (Reservasi Futsal)

> Concept: **sports/esports scoreboard dashboard** — gelap, neon, dinamis, gamified; terasa seperti dashboard arena live. Platform: responsive web. Bahasa: Indonesia.

## Brand voice
Energik, lugas, sporty. "Booking lapangan", "Gas main!", "Pilih slot — bisa lebih dari satu".

## Color tokens
| Token | Hex | Pakai |
|---|---|---|
| `bg` | `#0b1220` | latar gelap (navy/charcoal) |
| `surface` | `#0f1a2e` / `#1e293b` | panel & sel |
| `text` | `#e2e8f0` | teks utama |
| `muted` | `#94a3b8` | teks sekunder |
| `primary` | `#84cc16` | aksen neon (lime) — CTA, terpilih |
| `primary-hover` | `#a3e635` | hover |
| `cell-free` | `#1e293b` border `#334155` | slot tersedia |
| `cell-booked` | `#0f172a` teks `#475569` | terisi |
| `danger` | `#f43f5e` | hapus slot |
| `border` | `#1f2a3d` | garis |

## Typography
- **Outfit** (geometric/condensed feel) 400–800 — judul tegas, angka total besar.
- Skala: H1 24–28, harga/total 20 bold, sel grid 12–13 bold, label 11.

## Shape & elevation
- Radius sedang `10–16px`; sel grid kotak membulat.
- Glow/aksen lime pada elemen aktif; bayangan minim (desain flat-dark).

## Components
- **Date picker** (dark, `color-scheme: dark`).
- **Schedule grid (signature)**: kolom = lapangan, baris = jam; sel = Pesan / Dipilih / Terisi; multi-select.
- **Cart/scoreboard panel**: jumlah slot, chip slot terpilih (Lap A • 19:00 ✕), total harga live, form penyewa.
- **Buttons**: primary lime, teks gelap, tebal.

## States
Empty = grid penuh "Pesan". Hover sel → border lime. Selected = lime solid. Disabled = "Terisi" abu gelap. Success = modal centang lime + ringkasan (jumlah jam, total).

## Motion
Snappy & kinetik: toggle sel cepat, total count-up, glow pulse halus. Hormati reduced-motion.

## Layout
Dashboard: header + date; grid sebagai hero (scroll-x di mobile); panel ringkasan muncul saat ada slot dipilih (sticky di mobile).
