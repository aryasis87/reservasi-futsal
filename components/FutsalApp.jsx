'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, User, Phone, X, Sun, Moon, Flame } from 'lucide-react';
import { arena, courts, hours, hargaSlot, golonganJam, terisiContoh } from '@/lib/data';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { useHariIni } from '@/lib/useHariIni';
import { tambahHari, hariKe, fmtTanggal, sudahLewat, rupiah, kodePesan } from '@/lib/waktu';

const key = (c, h) => `${c}-${h}`;
const HARI = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const IKON = { siang: Sun, emas: Flame, malam: Moon };

export default function FutsalApp() {
  const { hari, sekarang } = useHariIni(60);
  const [punyaku, setPunyaku] = useLocalStorage('gelanggangpetang.booking', []);
  const [date, setDate] = useState(null);
  const [picked, setPicked] = useState([]);
  const [form, setForm] = useState({ name: '', phone: '' });
  const [done, setDone] = useState(null);

  const lewat = (d, h) => (sekarang ? sudahLewat(d, h, 10, sekarang) : true);
  const hariPil = useMemo(() => (hari ? Array.from({ length: 7 }, (_, i) => tambahHari(hari, i)) : []), [hari]);
  useEffect(() => {
    if (!hari || date) return;
    setDate(hours.some((h) => !lewat(hari, h)) ? hari : tambahHari(hari, 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hari]);

  const bookedSet = useMemo(() => {
    if (!date) return new Set();
    const s = terisiContoh(date);
    punyaku.filter((r) => r.date === date).forEach((r) => s.add(key(r.courtId, r.hour)));
    return s;
  }, [punyaku, date]);

  const penuh = picked.length >= arena.maksSlot;
  const toggle = (c, h) => {
    const k = key(c, h);
    if (bookedSet.has(k) || lewat(date, h)) return;
    setPicked((p) => (p.includes(k) ? p.filter((x) => x !== k) : p.length >= arena.maksSlot ? p : [...p, k]));
  };
  const total = picked.reduce((a, k) => a + hargaSlot(date, k.split('-')[1]), 0);

  const confirm = (e) => {
    e.preventDefault();
    if (!picked.length || !form.name.trim() || !form.phone.trim()) return;
    const grup = `f-${Date.now()}`;
    const kode = kodePesan('GP', grup);
    const slots = [...picked].sort().map((k) => { const [courtId, hour] = k.split('-'); return { id: `${grup}-${k}`, grup, kode, date, courtId, hour, harga: hargaSlot(date, hour), ...form }; });
    setPunyaku((p) => [...p, ...slots]);
    setDone({ kode, slots, total, name: form.name, date });
    setPicked([]); setForm({ name: '', phone: '' });
  };

  return (
    <div className="pb-10">
      <main className="mx-auto max-w-4xl px-5 py-6">
        <div className="mb-6 grid gap-3 sm:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl border border-slate-700 bg-gradient-to-r from-slate-900 via-slate-800 to-lime-950 p-5">
            <h1 className="text-2xl font-extrabold">Booking lapangan</h1>
            <p className="mt-1 text-sm text-slate-300">Pilih sampai {arena.maksSlot} jam sekaligus, boleh beda lapangan. Harga tertera di tiap kotak.</p>
          </div>
          <Link href="/sparring" className="group rounded-2xl border border-lime-400/40 bg-lime-400/10 p-5 transition hover:bg-lime-400/15">
            <p className="text-sm font-bold text-lime-300">Belum punya lawan?</p>
            <p className="mt-1 text-sm text-slate-200">Lihat tim yang sedang cari sparring minggu ini →</p>
          </Link>
        </div>

        <div className="mb-4 flex flex-col gap-3">
          <h2 className="text-lg font-bold">Tanggal{date && <span className="font-normal text-slate-300"> · {fmtTanggal(date)}</span>}</h2>
          {!hari ? <p className="text-sm text-slate-300">Memuat tanggal…</p> : (
            <div className="relative flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {hariPil.map((d, i) => {
                const active = date === d; const habis = hours.every((h) => lewat(d, h));
                return (
                  <button key={d} type="button" disabled={habis} onClick={() => { setDate(d); setPicked([]); }} aria-pressed={active}
                    className={`shrink-0 rounded-lg border-2 px-4 py-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${active ? 'border-lime-400 bg-lime-400/10 text-lime-300' : 'border-slate-700 bg-slate-800 text-slate-100 hover:border-lime-400/50'}`}>
                    {i === 0 ? 'Hari ini' : i === 1 ? 'Besok' : HARI[hariKe(d)]} <span className="font-normal">{Number(d.slice(8))}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="mb-3 flex flex-wrap gap-4 text-xs font-bold text-slate-300">
          <span className="flex items-center gap-1.5"><span className="h-4 w-4 rounded border border-slate-500 bg-slate-800" aria-hidden="true" /> Kosong</span>
          <span className="flex items-center gap-1.5"><span className="h-4 w-4 rounded border border-lime-400 bg-lime-400/20" aria-hidden="true" /> Dipilih</span>
          <span className="flex items-center gap-1.5"><span className="h-4 w-4 rounded border border-slate-800 bg-[#0f172a]" aria-hidden="true" /> Terisi / lewat</span>
          <span className="flex items-center gap-1.5"><Flame size={14} className="text-amber-300" aria-hidden="true" /> Jam emas</span>
        </div>

        <div className="relative overflow-x-auto rounded-2xl border border-slate-700 bg-[#0f1a2e]">
          <table className="w-full min-w-[560px] border-collapse text-center">
            <caption className="sr-only">Jadwal lapangan {date ? fmtTanggal(date) : ''}</caption>
            <thead>
              <tr className="border-b border-slate-700">
                <th scope="col" className="w-24 border-r border-slate-700 py-3 text-xs font-bold text-slate-300">JAM</th>
                {courts.map((c) => (
                  <th key={c.id} scope="col" className="border-r border-slate-700 py-2 last:border-r-0">
                    <span className="block text-sm font-bold">{c.name}</span>
                    <span className="block text-[11px] font-normal text-slate-300">{c.type}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hours.map((h) => {
                const Ikon = IKON[golonganJam(h)];
                return (
                  <tr key={h} className="border-b border-slate-700/60 last:border-b-0">
                    <th scope="row" className="border-r border-slate-700 py-3 font-mono text-base font-bold text-slate-200">
                      <span className="inline-flex items-center gap-1.5">{h}<Ikon size={13} className={golonganJam(h) === 'emas' ? 'text-amber-300' : 'text-slate-400'} aria-hidden="true" /></span>
                    </th>
                    {courts.map((c) => {
                      const k = key(c.id, h); const habis = !date || lewat(date, h); const booked = bookedSet.has(k); const sel = picked.includes(k);
                      const off = booked || habis;
                      return (
                        <td key={k} className="border-r border-slate-800 p-0 last:border-r-0">
                          <button type="button" disabled={off || (penuh && !sel)} onClick={() => toggle(c.id, h)} aria-pressed={sel}
                            aria-label={`${c.name} jam ${h}${booked ? ', terisi' : habis ? ', sudah lewat' : `, ${rupiah(hargaSlot(date, h))}`}`}
                            className={`h-full w-full py-3 text-xs font-bold transition ${
                              sel ? 'bg-lime-400/15 text-lime-300 shadow-[inset_0_0_0_2px_#84cc16]'
                              : off ? 'cursor-not-allowed bg-[#0f172a] text-slate-500'
                              : penuh ? 'cursor-not-allowed bg-slate-800/40 text-slate-400'
                              : 'bg-slate-800/40 text-slate-200 hover:bg-lime-400/10 hover:text-lime-300'
                            }`}>
                            {booked ? 'Terisi' : habis ? '—' : sel ? 'Dipilih' : `${Math.round(hargaSlot(date, h) / 1000)}rb`}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {penuh && <p className="mt-2 text-sm text-amber-200">Maksimal {arena.maksSlot} jam per booking. Hapus salah satu untuk memilih jam lain.</p>}

        <AnimatePresence>
          {picked.length > 0 && (
            <motion.form initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} onSubmit={confirm} className="mt-6 rounded-2xl border border-slate-700 bg-slate-900/70 p-6">
              <div className="flex items-center justify-between"><h2 className="font-bold">Slot dipilih ({picked.length})</h2><span className="font-bold text-lime-300">{rupiah(total)}</span></div>
              <ul className="mt-3 flex flex-wrap gap-2">
                {[...picked].sort().map((k) => { const [c, h] = k.split('-'); return (
                  <li key={k} className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-100">Lap {c} · {h} · {rupiah(hargaSlot(date, h))}<button type="button" onClick={() => setPicked((p) => p.filter((x) => x !== k))} aria-label={`Hapus lapangan ${c} jam ${h}`} className="text-slate-300 hover:text-rose-300"><X size={12} /></button></li>
                ); })}
              </ul>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-800/60 px-3 py-2.5 focus-within:border-lime-400"><User size={16} className="text-slate-300" aria-hidden="true" /><span className="sr-only">Nama tim atau penyewa</span><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nama tim / penyewa" autoComplete="name" required className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" /></label>
                <label className="flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-800/60 px-3 py-2.5 focus-within:border-lime-400"><Phone size={16} className="text-slate-300" aria-hidden="true" /><span className="sr-only">Nomor HP</span><input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Nomor HP" autoComplete="tel" required className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" /></label>
              </div>
              <button type="submit" className="mt-5 w-full rounded-xl bg-lime-400 py-3.5 text-sm font-bold text-slate-900 transition hover:bg-lime-300">Simpan booking · {rupiah(total)}</button>
              <p className="mt-2 text-center text-xs text-slate-300">Purwarupa: tidak ada pembayaran. Booking disimpan di peramban ini.</p>
            </motion.form>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {done && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDone(null)}>
            <motion.div role="dialog" aria-modal="true" aria-labelledby="judul-selesai" initial={{ scale: 0.9, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-2xl border border-slate-700 bg-slate-900 p-7 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-lime-400 text-slate-900"><Check size={28} /></div>
              <h2 id="judul-selesai" className="mt-4 text-2xl font-bold">Booking tersimpan</h2>
              <p className="mt-1 text-sm text-slate-300">Kode <span className="font-mono font-semibold text-slate-100">{done.kode}</span> · {done.name}</p>
              <dl className="mt-5 space-y-1.5 rounded-xl bg-slate-800 p-4 text-left text-sm text-slate-300">
                <div className="flex justify-between gap-4"><dt>Tanggal</dt><dd className="font-semibold text-slate-100">{fmtTanggal(done.date)}</dd></div>
                <div className="flex justify-between gap-4"><dt>Slot</dt><dd className="text-right font-semibold text-slate-100">{done.slots.map((s) => `${s.courtId} ${s.hour}`).join(', ')}</dd></div>
                <div className="flex justify-between gap-4"><dt>Total</dt><dd className="font-semibold text-lime-300">{rupiah(done.total)}</dd></div>
              </dl>
              <p className="mt-4 text-xs text-slate-300">Datang 10 menit lebih awal. Ini purwarupa — tidak ada pembayaran.</p>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <Link href="/jadwal-saya" className="rounded-xl bg-lime-400 py-3 text-sm font-bold text-slate-900 hover:bg-lime-300">Jadwal saya</Link>
                <button type="button" onClick={() => setDone(null)} className="rounded-xl border border-slate-600 py-3 text-sm font-semibold text-slate-100 hover:bg-slate-800">Tutup</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
