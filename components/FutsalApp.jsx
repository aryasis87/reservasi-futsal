'use client';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Goal, Bell, Zap, Check, User, Phone, X } from 'lucide-react';
import { arena, courts, hours, seedReservations } from '@/lib/data';
import { useLocalStorage } from '@/lib/useLocalStorage';

const today = new Date().toISOString().slice(0, 10);
const rupiah = (n) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);
const key = (c, h) => `${c}-${h}`;
const DAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const dayPills = Array.from({ length: 5 }, (_, i) => {
  const d = new Date(); d.setDate(d.getDate() + i);
  return { iso: d.toISOString().slice(0, 10), label: i === 0 ? 'Hari Ini' : i === 1 ? 'Besok' : DAYS[d.getDay()], num: d.getDate() };
});

export default function FutsalApp() {
  const [reservations, setReservations] = useLocalStorage('futsal.reservations', seedReservations);
  const [date, setDate] = useState(today);
  const [picked, setPicked] = useState([]);
  const [form, setForm] = useState({ name: '', phone: '' });
  const [done, setDone] = useState(null);

  const bookedSet = useMemo(() => {
    const s = new Set();
    reservations.filter((r) => r.date === date).forEach((r) => s.add(key(r.courtId, r.hour)));
    return s;
  }, [reservations, date]);

  const toggle = (c, h) => { const k = key(c, h); if (bookedSet.has(k)) return; setPicked((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k])); };
  const total = picked.length * arena.pricePerHour;

  const confirm = (e) => {
    e.preventDefault();
    if (!picked.length || !form.name.trim() || !form.phone.trim()) return;
    const slots = picked.map((k) => { const [courtId, hour] = k.split('-'); return { id: `f-${Date.now()}-${k}`, date, courtId, hour, ...form }; });
    setReservations((p) => [...p, ...slots]);
    setDone({ count: picked.length, total, name: form.name, date });
    setPicked([]); setForm({ name: '', phone: '' });
  };

  return (
    <div className="min-h-screen pb-10">
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-800 bg-[#0b1220] px-5">
        <span className="flex items-center gap-2"><Goal size={22} className="text-lime-400" /><span className="text-lg font-extrabold tracking-tight">{arena.name}</span></span>
        <Bell size={20} className="text-slate-400" />
      </header>

      <main className="mx-auto max-w-3xl px-5 py-6">
        {/* Promo banner */}
        <div className="relative mb-6 overflow-hidden rounded-2xl border border-slate-700 bg-gradient-to-r from-slate-900 via-slate-800 to-lime-900/40 p-5">
          <div className="absolute -right-6 top-1/2 -translate-y-1/2 text-lime-400/20"><Zap size={120} /></div>
          <span className="inline-block rounded-full bg-lime-400 px-3 py-1 text-[11px] font-extrabold uppercase text-slate-900">Promo Khusus</span>
          <h2 className="mt-2 text-xl font-extrabold">Paket Member Bulanan</h2>
          <p className="mt-1 max-w-sm text-sm text-slate-300">Hemat hingga 30% untuk pemesanan rutin. Main lebih sering, bayar lebih hemat.</p>
        </div>

        {/* Header + date pills */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold">Jadwal Lapangan</h2>
            <p className="text-sm text-slate-400">Pilih slot waktu untuk bermain (bisa lebih dari satu).</p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {dayPills.map((d) => {
              const active = date === d.iso;
              return (
                <button key={d.iso} onClick={() => { setDate(d.iso); setPicked([]); }}
                  className={`shrink-0 rounded-lg border-2 px-4 py-2 text-sm font-bold transition ${active ? 'border-lime-400 bg-lime-400/10 text-lime-400' : 'border-slate-700 bg-slate-800 text-slate-200 hover:border-lime-400/50'}`}>
                  {d.label} ({d.num})
                </button>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mb-3 flex flex-wrap gap-4 text-xs font-bold text-slate-400">
          <span className="flex items-center gap-1.5"><span className="h-4 w-4 rounded border border-slate-600 bg-slate-800" /> Tersedia</span>
          <span className="flex items-center gap-1.5"><span className="h-4 w-4 rounded border border-lime-400 bg-lime-400/20" /> Dipilih</span>
          <span className="flex items-center gap-1.5"><span className="h-4 w-4 rounded border border-slate-800 bg-[#0f172a]" /> Terisi</span>
        </div>

        {/* Scoreboard grid */}
        <div className="overflow-x-auto rounded-2xl border border-slate-700 bg-[#0f1a2e]">
          <div className="min-w-[520px]">
            {/* header */}
            <div className="grid border-b border-slate-700" style={{ gridTemplateColumns: `6rem repeat(${courts.length}, 1fr)` }}>
              <div className="flex items-center justify-center border-r border-slate-700 py-3 text-xs font-bold text-slate-400">WAKTU</div>
              {courts.map((c) => (
                <div key={c.id} className="border-r border-slate-700 py-2 text-center last:border-r-0">
                  <p className="text-sm font-bold">{c.name}</p>
                  <p className="text-[11px] text-slate-400">{c.type} • Indoor</p>
                </div>
              ))}
            </div>
            {/* rows */}
            {hours.map((h) => (
              <div key={h} className="grid border-b border-slate-700/50 last:border-b-0" style={{ gridTemplateColumns: `6rem repeat(${courts.length}, 1fr)` }}>
                <div className="flex items-center justify-center border-r border-slate-700 py-3 font-mono text-lg font-bold text-slate-400">{h}</div>
                {courts.map((c) => {
                  const k = key(c.id, h); const booked = bookedSet.has(k); const sel = picked.includes(k);
                  return (
                    <button key={k} disabled={booked} onClick={() => toggle(c.id, h)}
                      className={`border-r border-slate-800 py-3 text-center text-xs font-bold transition last:border-r-0 ${
                        sel ? 'bg-lime-400/15 text-lime-300 shadow-[inset_0_0_0_2px_#84cc16]'
                        : booked ? 'cursor-not-allowed bg-[#0f172a] text-slate-600'
                        : 'bg-slate-800/40 text-slate-300 hover:bg-lime-400/10 hover:text-lime-300'
                      }`}>
                      {booked ? 'Terisi' : sel ? 'Dipilih' : rupiah(arena.pricePerHour)}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Cart */}
        <AnimatePresence>
          {picked.length > 0 && (
            <motion.form initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} onSubmit={confirm} className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <div className="flex items-center justify-between"><h3 className="font-bold">Slot dipilih ({picked.length})</h3><span className="font-bold text-lime-400">{rupiah(total)}</span></div>
              <div className="mt-3 flex flex-wrap gap-2">
                {picked.map((k) => { const [c, h] = k.split('-'); return (
                  <span key={k} className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-200">Lap {c} • {h}<button type="button" onClick={() => setPicked((p) => p.filter((x) => x !== k))} aria-label="Hapus" className="text-slate-400 hover:text-rose-400"><X size={12} /></button></span>
                ); })}
              </div>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-3 py-2.5 focus-within:border-lime-400"><User size={16} className="text-slate-400" /><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nama penyewa" required className="w-full bg-transparent text-sm outline-none" /></label>
                <label className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-3 py-2.5 focus-within:border-lime-400"><Phone size={16} className="text-slate-400" /><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="No. WhatsApp" required className="w-full bg-transparent text-sm outline-none" /></label>
              </div>
              <button type="submit" className="mt-5 w-full rounded-xl bg-lime-400 py-3.5 text-sm font-bold text-slate-900 transition hover:bg-lime-300">Bayar &amp; Booking • {rupiah(total)}</button>
            </motion.form>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {done && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDone(null)}>
            <motion.div initial={{ scale: 0.9, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-2xl border border-slate-700 bg-slate-900 p-7 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-lime-400 text-slate-900"><Check size={28} /></div>
              <h3 className="mt-4 text-2xl font-bold">Booking Berhasil!</h3>
              <p className="mt-1 text-sm text-slate-400">Gas main, {done.name}! ⚽</p>
              <div className="mt-5 space-y-1.5 rounded-xl bg-slate-800 p-4 text-left text-sm text-slate-300">
                <p className="flex justify-between"><span>Tanggal</span><span className="font-semibold text-slate-100">{done.date}</span></p>
                <p className="flex justify-between"><span>Jumlah slot</span><span className="font-semibold text-slate-100">{done.count} jam</span></p>
                <p className="flex justify-between"><span>Total</span><span className="font-semibold text-lime-400">{rupiah(done.total)}</span></p>
              </div>
              <button onClick={() => setDone(null)} className="mt-5 w-full rounded-xl border border-slate-600 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800">Selesai</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
