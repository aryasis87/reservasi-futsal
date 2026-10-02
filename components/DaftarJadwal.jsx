'use client';
import Link from 'next/link';
import { X } from 'lucide-react';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { useHariIni } from '@/lib/useHariIni';
import { fmtTanggal, sudahLewat, selisihHari, rupiah, menit } from '@/lib/waktu';

export default function DaftarJadwal() {
  const [punyaku, setPunyaku, loaded] = useLocalStorage('gelanggangpetang.booking', []);
  const { hari, sekarang } = useHariIni();
  if (!loaded || !hari) return <p className="py-16 text-center text-slate-300">Memuat jadwal…</p>;

  if (!punyaku.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-600 p-10 text-center">
        <p className="text-xl font-bold">Belum ada booking</p>
        <p className="mt-2 text-slate-300">Booking yang kamu buat di peramban ini akan muncul di sini.</p>
        <Link href="/" className="mt-5 inline-block rounded-xl bg-lime-400 px-6 py-3 text-sm font-bold text-slate-900 hover:bg-lime-300">Booking lapangan</Link>
      </div>
    );
  }

  // Kelompokkan per kode booking.
  const grup = Object.values(punyaku.reduce((a, s) => { (a[s.grup || s.id] ||= { kode: s.kode, date: s.date, name: s.name, slots: [] }).slots.push(s); return a; }, {}));
  grup.forEach((g) => g.slots.sort((a, b) => a.hour.localeCompare(b.hour)));
  const mulai = (g) => g.slots[0].hour;
  const selesai = (g) => g.slots.every((s) => sudahLewat(g.date, s.hour, -60, sekarang));
  const nanti = grup.filter((g) => !selesai(g)).sort((a, b) => (a.date + mulai(a)).localeCompare(b.date + mulai(b)));
  const lalu = grup.filter(selesai);
  const hapus = (g, tanya) => {
    if (tanya) {
      const jam = (menitKe(g) - (sekarang.getHours() * 60 + sekarang.getMinutes())) / 60 + selisihHari(hari, g.date) * 24;
      if (!window.confirm(jam >= 24 ? 'Batalkan booking ini? Masih gratis.' : 'Kurang dari 24 jam sebelum main: di lapangan sungguhan pembatalan dikenai biaya. Tetap batalkan?')) return;
    }
    setPunyaku((p) => p.filter((s) => !g.slots.some((x) => x.id === s.id)));
  };
  const menitKe = (g) => menit(mulai(g));

  return (
    <div className="space-y-10">
      <section aria-labelledby="h-nanti">
        <h2 id="h-nanti" className="text-xl font-extrabold">Akan main ({nanti.length})</h2>
        {nanti.length === 0 ? <p className="mt-3 text-slate-300">Tidak ada jadwal yang akan datang.</p> : (
          <ul className="mt-4 space-y-4">
            {nanti.map((g) => {
              const h = selisihHari(hari, g.date);
              return (
                <li key={g.kode} className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-lime-300">{h === 0 ? 'Hari ini' : h === 1 ? 'Besok' : `${h} hari lagi`}</p>
                      <p className="mt-1 text-lg font-bold">{fmtTanggal(g.date)}</p>
                      <p className="text-sm text-slate-300">{g.name}</p>
                    </div>
                    <div className="text-right"><p className="font-mono text-sm font-bold text-slate-200">{g.kode}</p><p className="font-bold text-lime-300">{rupiah(g.slots.reduce((a, s) => a + (s.harga || 0), 0))}</p></div>
                  </div>
                  <ul className="mt-3 flex flex-wrap gap-2">{g.slots.map((s) => <li key={s.id} className="rounded-full bg-slate-800 px-3 py-1 text-sm font-semibold">Lap {s.courtId} · {s.hour}</li>)}</ul>
                  <button type="button" onClick={() => hapus(g, true)} className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-rose-300 hover:underline"><X size={15} aria-hidden="true" /> Batalkan</button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
      {lalu.length > 0 && (
        <section aria-labelledby="h-lalu">
          <h2 id="h-lalu" className="text-xl font-extrabold">Sudah main</h2>
          <ul className="mt-4 divide-y divide-slate-800 rounded-2xl border border-slate-700">
            {lalu.map((g) => (
              <li key={g.kode} className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 text-sm text-slate-300">
                <span>{fmtTanggal(g.date, { day: 'numeric', month: 'short' })} · {g.slots.map((s) => `${s.courtId} ${s.hour}`).join(', ')}</span>
                <button type="button" onClick={() => hapus(g, false)} className="font-bold text-slate-100 hover:underline">Hapus</button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
