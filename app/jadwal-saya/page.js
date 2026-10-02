import DaftarJadwal from '@/components/DaftarJadwal';

export const metadata = {
  title: 'Jadwal saya',
  description: 'Lihat dan batalkan booking lapangan Gelanggang Petang yang tersimpan di peramban ini.',
  alternates: { canonical: '/jadwal-saya' },
  robots: { index: false, follow: true },
};

export default function JadwalSayaPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <h1 className="text-3xl font-extrabold md:text-4xl">Jadwal saya</h1>
      <p className="mt-2 text-slate-300">Tersimpan di peramban ini saja. Batal gratis sampai 24 jam sebelum main.</p>
      <div className="mt-8"><DaftarJadwal /></div>
    </main>
  );
}
