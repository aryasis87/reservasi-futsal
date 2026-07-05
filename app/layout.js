import './globals.css';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });

export const metadata = {
  title: 'Arena Futsal Garuda — Booking Lapangan',
  description: 'Pesan slot lapangan futsal lewat grid jadwal jam × lapangan.',
};

export const viewport = { themeColor: '#84cc16' };

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={outfit.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
