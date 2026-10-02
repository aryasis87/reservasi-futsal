import Link from 'next/link';
import { Check } from 'lucide-react';
import { TARIF, courts, aturan, fasilitas, arena } from '@/lib/data';
import { rupiah } from '@/lib/waktu';

export const metadata = {
  title: 'Harga & aturan',
  description: 'Tarif sewa lapangan futsal Gelanggang Petang per jam — sore, jam emas, dan malam, hari biasa dan akhir pekan — beserta jenis lapangan, aturan, dan fasilitas.',
  alternates: { canonical: '/harga' },
};

export default function HargaPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-10">
      <h1 className="text-3xl font-extrabold md:text-4xl">Harga & aturan</h1>
      <p className="mt-2 max-w-2xl text-slate-300">Harga per jam per lapangan, sama untuk ketiga lapangan. Akhir pekan berarti Sabtu dan Minggu.</p>

      <div className="relative mt-8 overflow-x-auto rounded-2xl border border-slate-700 bg-[#0f1a2e]">
        <table className="w-full min-w-[480px] text-left">
          <caption className="sr-only">Tarif sewa per jam</caption>
          <thead className="border-b border-slate-700 text-sm text-slate-300">
            <tr><th scope="col" className="px-5 py-3 font-bold">Waktu</th><th scope="col" className="px-5 py-3 font-bold">Senin–Jumat</th><th scope="col" className="px-5 py-3 font-bold">Sabtu–Minggu</th></tr>
          </thead>
          <tbody>
            {Object.entries(TARIF).map(([k, t]) => (
              <tr key={k} className={`border-b border-slate-800 last:border-b-0 ${k === 'emas' ? 'bg-lime-400/5' : ''}`}>
                <th scope="row" className="px-5 py-4 font-bold text-slate-100">{t.label}</th>
                <td className="px-5 py-4 font-mono text-lg text-slate-100">{rupiah(t.biasa)}</td>
                <td className="px-5 py-4 font-mono text-lg text-lime-300">{rupiah(t.akhirPekan)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-12 text-2xl font-extrabold">Lapangan</h2>
      <ul className="mt-4 grid gap-4 sm:grid-cols-3">
        {courts.map((c) => (
          <li key={c.id} className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5">
            <p className="text-lg font-bold">{c.name}</p>
            <p className="text-sm text-lime-300">{c.type} · {c.ukuran}</p>
            <p className="mt-2 text-sm text-slate-300">{c.catatan}</p>
          </li>
        ))}
      </ul>

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        <section aria-labelledby="h-aturan">
          <h2 id="h-aturan" className="text-2xl font-extrabold">Aturan main</h2>
          <ul className="mt-4 space-y-2">{aturan.map((a) => <li key={a} className="flex gap-2 text-slate-200"><Check size={18} className="mt-0.5 shrink-0 text-lime-400" aria-hidden="true" /> {a}</li>)}</ul>
        </section>
        <section aria-labelledby="h-fas">
          <h2 id="h-fas" className="text-2xl font-extrabold">Fasilitas</h2>
          <ul className="mt-4 space-y-2">{fasilitas.map((a) => <li key={a} className="flex gap-2 text-slate-200"><Check size={18} className="mt-0.5 shrink-0 text-lime-400" aria-hidden="true" /> {a}</li>)}</ul>
        </section>
      </div>
      <Link href="/" className="mt-10 inline-block rounded-xl bg-lime-400 px-6 py-3 text-sm font-bold text-slate-900 hover:bg-lime-300">Booking sekarang</Link>
      <p className="mt-3 text-sm text-slate-300">Maksimal {arena.maksSlot} jam per booking.</p>
    </main>
  );
}
