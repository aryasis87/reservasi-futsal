import './globals.css';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });

const __jsonld = {"@context":"https://schema.org","@type":"SportsActivityLocation","name":"Arena Futsal Garuda","description":"Booking lapangan futsal online","url":"https://futsal.pintuweb.com","areaServed":"ID"};

export const metadata = {
  metadataBase: new URL("https://futsal.pintuweb.com"),
  title: "Arena Futsal Garuda — Booking Lapangan Online",
  description: "Booking lapangan futsal online lewat grid jadwal jam × lapangan. Pilih slot, konfirmasi, dan main tanpa ribet.",
  applicationName: "Arena Futsal Garuda",
  keywords: ["booking futsal", "sewa lapangan futsal", "jadwal futsal", "reservasi lapangan"],
  authors: [{ name: "Arena Futsal Garuda" }],
  creator: "Arena Futsal Garuda",
  publisher: "Arena Futsal Garuda",
  alternates: { canonical: "https://futsal.pintuweb.com" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://futsal.pintuweb.com",
    siteName: "Arena Futsal Garuda",
    title: "Arena Futsal Garuda — Booking Lapangan Online",
    description: "Booking lapangan futsal online lewat grid jadwal jam × lapangan. Pilih slot, konfirmasi, dan main tanpa ribet.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Arena Futsal Garuda — Booking Lapangan Online" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arena Futsal Garuda — Booking Lapangan Online",
    description: "Booking lapangan futsal online lewat grid jadwal jam × lapangan. Pilih slot, konfirmasi, dan main tanpa ribet.",
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
      <body className="antialiased">{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__jsonld) }} />
        </body>
    </html>
  );
}
