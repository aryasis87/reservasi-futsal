import Link from 'next/link';
import { arena, nav } from '@/lib/data';

export default function Kaki() {
  return (
    <footer className="mt-10 border-t border-slate-800 bg-[#0a101c]">
      <div className="mx-auto grid max-w-4xl gap-8 px-5 py-10 sm:grid-cols-3">
        <div>
          <p className="text-lg font-extrabold">{arena.name}</p>
          <p className="mt-2 text-sm text-slate-300">{arena.tagline}.</p>
        </div>
        <div className="text-sm text-slate-300">
          <p className="font-bold text-slate-100">Jam buka</p>
          <p className="mt-2">{arena.jam}</p>
          <p className="mt-1">Batal gratis sampai 24 jam sebelum main.</p>
        </div>
        <nav aria-label="Kaki" className="text-sm">
          <ul className="space-y-1.5">{nav.map((n) => <li key={n.href}><Link href={n.href} className="text-slate-300 underline-offset-4 hover:text-lime-300 hover:underline">{n.label}</Link></li>)}</ul>
        </nav>
      </div>
      <p className="border-t border-slate-800 px-5 py-4 text-center text-xs text-slate-300">Purwarupa desain: lapangan, harga, dan tim fiktif. Booking hanya disimpan di peramban ini.</p>
    </footer>
  );
}
