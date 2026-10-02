import './globals.css';
import { Outfit } from 'next/font/google';
import Kepala from '@/components/Kepala';
import Kaki from '@/components/Kaki';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });

const __jsonld = {"@context":"https://schema.org","@type":"WebSite","name":"Gelanggang Petang","description":"Booking lapangan futsal lewat grid jam × lapangan: harga sore, jam emas, dan malam terlihat di tiap kotak. Plus papan cari lawan untuk sparring.","url":"https://reservasi-futsal.vercel.app","inLanguage":"id"};

export const metadata = {
  metadataBase: new URL("https://reservasi-futsal.vercel.app"),
  title: { default: "Gelanggang Petang — Booking lapangan futsal", template: "%s — Gelanggang Petang" },
  description: "Booking lapangan futsal lewat grid jam × lapangan: harga sore, jam emas, dan malam terlihat di tiap kotak. Plus papan cari lawan untuk sparring.",
  applicationName: "Gelanggang Petang",
  keywords: ["booking lapangan futsal", "sewa lapangan futsal", "jadwal futsal", "cari lawan sparring"],
  authors: [{ name: "Gelanggang Petang" }],
  creator: "Gelanggang Petang",
  publisher: "Gelanggang Petang",
  alternates: { canonical: "https://reservasi-futsal.vercel.app" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://reservasi-futsal.vercel.app",
    siteName: "Gelanggang Petang",
    title: "Gelanggang Petang — Booking lapangan futsal",
    description: "Booking lapangan futsal lewat grid jam × lapangan: harga sore, jam emas, dan malam terlihat di tiap kotak. Plus papan cari lawan untuk sparring.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Gelanggang Petang — Booking lapangan futsal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gelanggang Petang — Booking lapangan futsal",
    description: "Booking lapangan futsal lewat grid jam × lapangan: harga sore, jam emas, dan malam terlihat di tiap kotak. Plus papan cari lawan untuk sparring.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export const viewport = { themeColor: '#84cc16' };

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={outfit.variable}>
      <body className="antialiased">
        <Kepala />
        {children}
        <Kaki />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__jsonld) }} />
        </body>
    </html>
  );
}
