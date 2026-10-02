'use client';
import { useState } from 'react';
import { Swords, Plus, Check, Trash2 } from 'lucide-react';
import { sparringContoh, LEVEL, courts, hours } from '@/lib/data';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { useHariIni } from '@/lib/useHariIni';
import { tambahHari, fmtTanggal } from '@/lib/waktu';

const KOSONG = { tim: '', level: 'Santai', tanggal: '', jam: '19:00', lapangan: 'A', catatan: '' };
const WARNA = { Santai: 'bg-sky-400/15 text-sky-200', Menengah: 'bg-amber-400/15 text-amber-200', Kompetitif: 'bg-rose-400/15 text-rose-200' };

export default function PapanSparring() {
  const { hari } = useHariIni();
  const [punyaku, setPunyaku] = useLocalStorage('gelanggangpetang.sparring', []);
  const [level, setLevel] = useState('Semua');
  const [buka, setBuka] = useState(false);
  const [form, setForm] = useState(KOSONG);
  const [ajak, setAjak] = useState(null);

  if (!hari) return <p className="py-16 text-center text-slate-300">Memuat papan…</p>;

  // Contoh dijadwalkan relatif terhadap hari ini supaya papan selalu berisi minggu ini.
  const semua = [
    ...punyaku.filter((s) => s.tanggal >= hari).map((s) => ({ ...s, milikku: true })),
    ...sparringContoh.map((s) => ({ ...s, tanggal: tambahHari(hari, s.hariKe) })),
  ].sort((a, b) => (a.tanggal + a.jam).localeCompare(b.tanggal + b.jam));
  const tampil = semua.filter((s) => level === 'Semua' || s.level === level);

  const kirim = (e) => {
    e.preventDefault();
    if (!form.tim.trim() || !form.tanggal) return;
    setPunyaku((p) => [...p, { ...form, id: `sp-${Date.now()}` }]);
    setForm(KOSONG); setBuka(false);
  };
  const field = 'mt-1 w-full rounded-xl border border-slate-600 bg-slate-800/60 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-lime-400';

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Saring level">
          {['Semua', ...LEVEL].map((l) => (
            <button key={l} type="button" onClick={() => setLevel(l)} aria-pressed={level === l} className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${level === l ? 'bg-lime-400 text-slate-900' : 'border border-slate-600 text-slate-200 hover:border-lime-400'}`}>{l}</button>
          ))}
        </div>
        <button type="button" onClick={() => setBuka((v) => !v)} aria-expanded={buka} className="inline-flex items-center gap-2 rounded-xl border border-lime-400 px-4 py-2 text-sm font-bold text-lime-300 hover:bg-lime-400/10"><Plus size={16} aria-hidden="true" /> Pasang tim kami</button>
      </div>

      {buka && (
        <form onSubmit={kirim} className="mt-5 grid gap-3 rounded-2xl border border-slate-700 bg-slate-900/70 p-5 sm:grid-cols-2">
          <label className="text-sm font-bold text-slate-200">Nama tim<input value={form.tim} onChange={(e) => setForm({ ...form, tim: e.target.value })} required className={field} /></label>
          <label className="text-sm font-bold text-slate-200">Level<select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className={field}>{LEVEL.map((l) => <option key={l}>{l}</option>)}</select></label>
          <label className="text-sm font-bold text-slate-200">Tanggal<input type="date" min={hari} max={tambahHari(hari, 30)} value={form.tanggal} onChange={(e) => setForm({ ...form, tanggal: e.target.value })} required className={field} /></label>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm font-bold text-slate-200">Jam<select value={form.jam} onChange={(e) => setForm({ ...form, jam: e.target.value })} className={field}>{hours.map((h) => <option key={h}>{h}</option>)}</select></label>
            <label className="text-sm font-bold text-slate-200">Lapangan<select value={form.lapangan} onChange={(e) => setForm({ ...form, lapangan: e.target.value })} className={field}>{courts.map((c) => <option key={c.id} value={c.id}>{c.id} · {c.type}</option>)}</select></label>
          </div>
          <label className="text-sm font-bold text-slate-200 sm:col-span-2">Catatan<input value={form.catatan} onChange={(e) => setForm({ ...form, catatan: e.target.value })} placeholder="Usia, gaya main, siapa bayar lapangan…" className={field} /></label>
          <button type="submit" className="rounded-xl bg-lime-400 py-3 text-sm font-bold text-slate-900 hover:bg-lime-300 sm:col-span-2">Pasang di papan</button>
          <p className="text-xs text-slate-300 sm:col-span-2">Purwarupa: hanya terlihat di peramban ini.</p>
        </form>
      )}

      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {tampil.map((s) => (
          <li key={s.id} className={`rounded-2xl border p-5 ${s.milikku ? 'border-lime-400/60 bg-lime-400/5' : 'border-slate-700 bg-slate-900/60'}`}>
            <div className="flex items-start justify-between gap-3">
              <p className="text-lg font-bold">{s.tim}</p>
              <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${WARNA[s.level]}`}>{s.level}</span>
            </div>
            <p className="mt-1 text-sm text-lime-300">{fmtTanggal(s.tanggal, { weekday: 'long', day: 'numeric', month: 'short' })} · {s.jam} · Lapangan {s.lapangan}</p>
            {s.catatan && <p className="mt-2 text-sm text-slate-300">{s.catatan}</p>}
            {s.milikku ? (
              <button type="button" onClick={() => setPunyaku((p) => p.filter((x) => x.id !== s.id))} className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-rose-300 hover:underline"><Trash2 size={15} aria-hidden="true" /> Hapus dari papan</button>
            ) : ajak === s.id ? (
              <p className="mt-4 flex items-start gap-2 text-sm text-slate-200" role="status"><Check size={16} className="mt-0.5 shrink-0 text-lime-400" aria-hidden="true" /> Tercatat. Di aplikasi sungguhan, kapten {s.tim} akan menerima ajakanmu. Purwarupa ini tidak mengirim apa pun.</p>
            ) : (
              <button type="button" onClick={() => setAjak(s.id)} className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-2 text-sm font-bold text-slate-100 hover:bg-slate-700"><Swords size={15} aria-hidden="true" /> Ajak tanding</button>
            )}
          </li>
        ))}
      </ul>
      {tampil.length === 0 && <p className="mt-6 text-slate-300">Belum ada tim di level ini.</p>}
    </div>
  );
}
